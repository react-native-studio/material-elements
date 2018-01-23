import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import {MotionCurve,MotionDuration} from '../utils'
import getTheme from '../styles/getTheme'

const STATES = {
  HIDDEN: 'HIDDEN',
  SHOWN: 'SHOWN',
  ANIMATING: 'ANIMATING',
};
const MENU_PADDING_VERTICAL = 8;
const SCREEN_INDENT = 8;


const defaultProps={
  style:{}
}
class Menu extends React.Component {
  static propTypes = {
    button: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    menuState: STATES.HIDDEN,

    top: 0,
    left: 0,

    menuWidth: 0,
    menuHeight: 0,

    buttonWidth: 0,
    buttonHeight: 0,

    menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
    opacityAnimation: new Animated.Value(0),
  };

  container = null;

  // Start menu animation
  onMenuLayout = e => {
    if (this.state.menuState === STATES.ANIMATING) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;
    const menuHeightWithPadding = height - MENU_PADDING_VERTICAL * 2;

    this.setState(
      {
        menuState: STATES.ANIMATING,
        menuWidth: width,
        menuHeight: height,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.menuSizeAnimation, {
            toValue: { x: width, y: menuHeightWithPadding },
            duration: MotionDuration.enteringDuration,
            easing: MotionCurve.standardCurve,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: MotionDuration.enteringDuration,
            easing: MotionCurve.standardCurve,
          }),
        ]).start();
      },
    );
  };

  // Save button width and height for menu layout
  onButtonLayout = e => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({ buttonWidth: width, buttonHeight: height });
  };

  show = () => {
    this.container.measureInWindow((x, y) => {
      this.setState({ menuState: STATES.SHOWN, top: y, left: x });
    });
  };

  hide = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: MotionDuration.leavingDuration,
      easing: MotionCurve.sharpCurve,
    }).start(() =>
      // Reset state
      this.setState({
        menuState: STATES.HIDDEN,
        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
      }),
    );
  };

  getStyles=()=>{
    const {menu}=getTheme();

    const {style}=this.props;

    return {
      container:[
        menu.container,
        style.container,
      ]
    }
  }
  render() {
    const dimensions = Dimensions.get('screen');

    const { menuSizeAnimation } = this.state;
    const menuSize = {
      width: menuSizeAnimation.x,
      height: menuSizeAnimation.y,
    };

    // Adjust position of menu
    let { left, top } = this.state;
    const transforms = [];

    // If menu hits right
    if (left > dimensions.width - this.state.menuWidth - SCREEN_INDENT) {
      transforms.push({
        translateX: Animated.multiply(menuSizeAnimation.x, -1),
      });

      left += this.state.buttonWidth;
    }

    // If menu hits bottom
    if (top > dimensions.height - this.state.menuHeight - SCREEN_INDENT) {
      transforms.push({
        translateY: Animated.multiply(menuSizeAnimation.y, -1),
      });

      top += this.state.buttonHeight - MENU_PADDING_VERTICAL * 2;
    }

    const shadowMenuContainerStyle = {
      opacity: this.state.opacityAnimation,
      transform: transforms,
      left,
      top,
    };

    const styles=this.getStyles();
    const { menuState } = this.state;
    const animationStarted = menuState === STATES.ANIMATING;
    const modalVisible = menuState === STATES.SHOWN || animationStarted;

    return (
      <View ref={ref=>this.container=ref} collapsable={false}>
        <View onLayout={this.onButtonLayout}>{this.props.button}</View>
        <Modal visible={modalVisible} onRequestClose={this.hide} transparent>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this.onMenuLayout}
                style={[
                  styles.container,
                  shadowMenuContainerStyle,
                ]}
              >
                <Animated.View
                  style={[{overflow:'hidden'}, animationStarted && menuSize]}
                >
                  {this.props.children}
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

Menu.defaultProps=defaultProps;
Menu.Item=MenuItem;
Menu.Divider=MenuDivider;
export default Menu;

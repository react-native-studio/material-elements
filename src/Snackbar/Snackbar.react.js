/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Animated, Easing, Platform, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
import getTheme from '../styles/getTheme'
import Button from '../Button';
const defaultProps = {
    onActionPress: null,
    actionText: null,
    visible: false,
    timeout: 2750,
    bottomNavigation: false,
    style: {},
};

const STATES={
  HIDDEN:'HIDDEN',
  SHOWN:'SHOWN',
  ANIMATING:'ANIMATING',
}
/**
* Component for snackbars
* https://material.io/guidelines/components/snackbars-toasts.html
*/
class Snackbar extends PureComponent {
    static propTypes={
        /**
         * The text message to display.
         */
        message: PropTypes.string.isRequired,
        /**
         * Whether or not the snackbar is visible.
         */
        visible: PropTypes.bool.isRequired,
        /**
         * The amount of time in milliseconds to show the snackbar.
         */
        timeout: PropTypes.number.isRequired,
        /**
         * Callback for when the timeout finishes.
         */
        onRequestClose: PropTypes.func.isRequired,
        /**
         * Whether or not there is a bottom navigation on the screen.
         */
        bottomNavigation: PropTypes.bool.isRequired,
        /**
         * The function to execute when the action is clicked.
         */
        onActionPress: PropTypes.func,
        /**
         * The function to execute when the action is clicked.
         */
        actionText: PropTypes.string,
        /**
         * Inline style of snackbar
         */
        style: PropTypes.shape({
            container: ViewPropTypes.style,
            message: ViewPropTypes.style,
            actionContainer:ViewPropTypes.style,
            actionText:ViewPropTypes.style,
        }),
    }
    constructor(props) {
        super(props);
        const styles = this.getStyles();

        const moveAnimatedValue=props.visible?0:StyleSheet.flatten(styles.container).height;
        this.state = {
            styles,
            moveAnimated: new Animated.Value(moveAnimatedValue),
            snackbarState:props.visible?STATES.SHOWN:STATES.HIDDEN,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { style, visible, bottomNavigation } = this.props;

        if (nextProps.style !== style) {
            this.setState({ styles: this.getStyles() });
        }

        if (nextProps.visible !== visible) {
            if (nextProps.visible === true) {
                this.show(nextProps.bottomNavigation);
                this.setHideTimer();
            } else {
                this.hide();
            }
        } else if ((nextProps.bottomNavigation !== bottomNavigation)
        && nextProps.visible) {
            this.move(nextProps.bottomNavigation);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.hideTimer);
    }
    //得到styles
    getStyles=()=>{
      const { snackbar } = getTheme();

      const {style}=this.props;
      const local = {};
      return {
        container: [
          snackbar.container,
          local.container,
          style.container,
        ],
        message: [
          snackbar.message,
          local.message,
          style.message,
        ],
        actionContainer:[
          snackbar.actionContainer,
          style.actionContainer,
        ],
        actionText:[
          snackbar.actionText,
          style.actionText,
        ]
      };
    }
    setHideTimer() {
        const { timeout, onRequestClose } = this.props;
        if (timeout > 0) {
            clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => {
                onRequestClose();
            }, timeout);
        }
    }
    show = (bottomNavigation) => {
        let toValue = 0;
        if (bottomNavigation) {
            // TODO: Get bottom navigation height from context.
            toValue = -56;
        }
        const {snackbarState}=this.state;
        if(snackbarState===STATES.SHOWN){
          return;
        }
        Animated.timing(this.state.moveAnimated, {
            toValue,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start((finished)=>{
          finished && this.setState({snackbarState:STATES.SHOWN})
        });
    }

    hide = () => {
        const { moveAnimated, styles,snackbarState } = this.state;

        if(snackbarState===STATES.HIDDEN){
          return ;
        }
        Animated.timing(moveAnimated, {
            toValue: (StyleSheet.flatten(styles.container).height),
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 1, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start((finished)=>{
          finished && this.setState({snackbarState:STATES.HIDDEN})
        });
    }

    move = (bottomNavigation) => {
        const { moveAnimated } = this.state;
        const toValue = bottomNavigation ? -56 : 0;
        const duration = bottomNavigation ? 225 : 195;
        const easing = bottomNavigation ?
            Easing.bezier(0.0, 0.0, 0.2, 1) : Easing.bezier(0.4, 0.0, 0.6, 1);

        Animated.timing(moveAnimated, {
            toValue,
            duration,
            easing,
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }

    renderAction = () => {
        const {actionText, onActionPress } = this.props;

        const styles=this.getStyles();

        if(!actionText)return null;

            return (
                <Button
                    style={{
                      container:StyleSheet.flatten(styles.actionContainer),
                      text:StyleSheet.flatten(styles.actionText)
                    }}
                    text={actionText}
                    onPress={onActionPress}
                />
            );

    }

    render() {
        const { message } = this.props;
        const {moveAnimated,styles } = this.state;


        return (
            <Animated.View
                style={[styles.container, {
                    transform: [{
                        translateY: moveAnimated,
                    }],
                }]}
            >
                <Text style={styles.message} >{ message }</Text>
                {this.renderAction()}
            </Animated.View>
        );
    }
}

Snackbar.defaultProps = defaultProps;

export default Snackbar;

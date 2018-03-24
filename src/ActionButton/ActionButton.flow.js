/**
 * @flow
 */
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform,
} from 'react-native';
import { ViewPropTypes } from '../utils';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
//$FlowFixMe
import getPlatformElevation from '../styles/getPlatformElevation';
import getTheme from '../styles/getTheme';
import type {IconPropTypes} from "../Icon/Icon.flow";
type ActionsType=Array<{
  icon:IconPropTypes,
  label:string,
  name:string,
}>
type ActionButtonStyle={
  positionContainer?:ViewPropTypes.style,
  toolbarPositionContainer?:ViewPropTypes.style,
  container?:ViewPropTypes.style,
  overlayContainer?:ViewPropTypes.style,
  toolbarContainer?:ViewPropTypes.style,
  toolbarActionContainer?:ViewPropTypes.style,
  speedDialContainer?:ViewPropTypes.style,
  speedDialActionContainer?:ViewPropTypes.style,
  speedDialActionLabel?:ViewPropTypes.style,
  speedDialActionLabelContainer?:ViewPropTypes.style,
  speedDialActionIconContainer?:ViewPropTypes.style,
  speedDialActionIcon?:ViewPropTypes.style,
  icon?:ViewPropTypes.style
}
type ActionButtonPropTypes={
  actions?:ActionsType,
  onPress?:(text:mixed)=>void,
  onLongPress?:(text:mixed)=>void,
  hidden?:boolean,
  icon?:IconPropTypes,
  transition?:'toolbar'| 'speedDial',
  rippleColor?:string,
  style:ActionButtonStyle | typeof defaultProps.style,
  size?:number,
}

const defaultProps = {
    actions: null,
    onPress: null,
    onLongPress: null,
    transition: null,
    icon: {name:'add'},
    style: {},
    hidden: false,
    rippleColor: '#AAF',
};
type ActionButtonState={
  render: string,
  elevation: number,
  scaleValue: Animated.Value,
}
function getStyles(props:ActionButtonPropTypes, state:ActionButtonState) {
    const { actionButton } = getTheme();
    const { size } = props;

    const local:ActionButtonStyle = {
        container: {},
    };

    if (size) {
        local.container = {
            height: size,
            width: size,
            borderRadius: size / 2,
        };
    }

    local.container = {
        ...local.container,
        ...getPlatformElevation(state.elevation),
    };

    return {
        positionContainer: [
            actionButton.positionContainer,
            local.positionContainer,
            props.style.positionContainer,
        ],
        toolbarPositionContainer: [
            actionButton.toolbarPositionContainer,
            local.toolbarPositionContainer,
            props.style.toolbarPositionContainer,
        ],
        container: [
            actionButton.container,
            local.container,
            props.style.container,
        ],
        overlayContainer: [
            actionButton.overlayContainer,
            local.overlayContainer,
            props.style.overlayContainer,
        ],
        toolbarContainer: [
            actionButton.toolbarContainer,
            local.toolbarContainer,
            props.style.toolbarContainer,
        ],
        toolbarActionContainer: [
            actionButton.toolbarActionContainer,
            local.toolbarActionContainer,
            props.style.toolbarActionContainer,
        ],
        speedDialContainer: [
            actionButton.speedDialContainer,
            local.speedDialContainer,
            props.style.speedDialContainer,
        ],
        speedDialActionContainer: [
            actionButton.speedDialActionContainer,
            local.speedDialActionContainer,
            props.style.speedDialActionContainer,
        ],
        speedDialActionLabel: [
            actionButton.speedDialActionLabel,
            local.speedDialActionLabel,
            props.style.speedDialActionLabel,
        ],
        speedDialActionLabelContainer: [
            actionButton.speedDialActionLabelContainer,
            local.speedDialActionLabelContainer,
            props.style.speedDialActionLabelContainer,
        ],
        speedDialActionIconContainer: [
            actionButton.speedDialActionIconContainer,
            local.speedDialActionIconContainer,
            props.style.speedDialActionIconContainer,
        ],
        speedDialActionIcon: [
            actionButton.speedDialActionIcon,
            local.speedDialActionIcon,
            props.style.speedDialActionIcon,
        ],
        icon: [
            actionButton.icon,
            local.icon,
            props.style.icon,
        ],
    };
}

class ActionButton extends PureComponent<ActionButtonPropTypes,ActionButtonState> {

    props:ActionButtonPropTypes
    state:ActionButtonState
    static defaultProps:typeof defaultProps
    static defaultProps=defaultProps
    constructor(props:ActionButtonPropTypes) {
        super(props);

        const scaleValue = props.hidden ? 0.01 : 1;

        this.state = {
            render: 'button',
            elevation: 2,
            scaleValue: new Animated.Value(scaleValue),
        };
    }
    componentWillReceiveProps(nextProps:ActionButtonPropTypes) {
        if (nextProps.hidden !== this.props.hidden) {
            if (nextProps.hidden === true) {
                this.hide();
            } else {
                this.show();
            }
        }
    }
    componentWillUpdate(nextProps:ActionButtonPropTypes, nextState:ActionButtonState) {
        if (this.state.render !== nextState.render) {
            LayoutAnimation.easeInEaseOut();
        }
    }
    onPress = (action:mixed) => {
        const { onPress } = this.props;

        this.toggleState();

        if (onPress) {
            onPress(action);
        }
    }
    getActionItemKey = ({ icon, name }:{icon:IconPropTypes,name:string}) => {
        let key;
        if (name) {
            key = name;
        } else if (icon && icon.name) {
            key = icon.name;
        }
        return key;
    }
    toggleState = () => {
        const { transition } = this.props;

        if (this.state.render === 'button') {
            if (transition) {
                this.setState({ render: transition });
            }
        } else {
            this.setState({ render: 'button' });
        }
    }
    show = () => {
        Animated.timing(this.state.scaleValue, {
             toValue: 1,
            duration: 225,
             easing: Easing.bezier(0.0, 0.0, 0.2, 1),
             useNativeDriver: Platform.OS === 'android',
         }).start();
    }
    hide = () => {
         Animated.timing(this.state.scaleValue, {
             // TODO: why is not 0 here?
             // see: https://github.com/facebook/react-native/issues/10510
            toValue: 0.01,
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
         }).start();
    }
    renderToolbarTransition = (styles:ActionButtonStyle) => {
        const { actions } = this.props;

        return (
            <View style={styles.toolbarPositionContainer}>
                <View key="main-button" style={styles.toolbarContainer}>
                    {actions&&actions.map((action) => {
                        return this.renderToolbarLabelAction(
                            styles, action.icon, action.label, action.name);
                    })}
                </View>
            </View>
        );
    }
    renderSpeedDialTransition = (styles:ActionButtonStyle) => {
        const { actions } = this.props;

        return (
            <View style={[StyleSheet.absoluteFillObject, { flex: 1 }]}>
                <TouchableWithoutFeedback onPress={this.toggleState}>
                    <View style={styles.overlayContainer}>
                        <View style={[styles.positionContainer, styles.speedDialContainer]}>
                            <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
                                {actions&&actions.map((action) => {
                                    return this.renderLabelAction(
                                        styles, action.icon, action.label, action.name);
                                })}
                            </View>
                            {this.renderMainButton(styles)}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    renderMainButton = (styles:ActionButtonStyle) => {
        const { onLongPress, icon } = this.props;
        const { render } = this.state;

        const mainIcon:IconPropTypes =render !== 'button' ? {name:'clear'} :icon?icon:{};

        return (
            <View key="main-button" style={styles.container}>
                <RippleFeedback
                    color={this.props.rippleColor}
                    onPress={() => this.onPress('main-button')}
                    onLongPress={onLongPress}
                    onPressIn={() => this.setState({ elevation: 4 })}
                    onPressOut={() => this.setState({ elevation: 2 })}
                    delayPressIn={20}
                    useTouchableWithoutFeedback
                >
                    {this.renderIconButton(styles, mainIcon)}
                </RippleFeedback>
            </View>
        );
    }
    renderToolbarAction = (styles:ActionButtonStyle, icon:IconPropTypes, name:string) => {
        let content;
        const key = this.getActionItemKey({ icon, name });

        if (React.isValidElement(icon)) {
            content = (
                <RippleFeedback
                    color={this.props.rippleColor}
                    onPress={() => this.onPress(key)}
                    delayPressIn={20}
                    useTouchableWithoutFeedback
                >
                    {this.renderIconButton(styles, icon)}
                </RippleFeedback>);
        } else {
            content = (
                <IconToggle
                    key={key}
                    name={key}
                    onPress={() => this.onPress(key)}
                    style={{ icon: styles.icon }}
                />);
        }
        return (
            <View key={key} style={styles.toolbarActionContainer}>
                {content}
            </View>
        );
    }
    /**
    * TODO: implement labels for toolbar?
    */
    renderToolbarLabelAction = (styles:ActionButtonStyle, icon:IconPropTypes, label:string, name:string) => {
        const key = this.getActionItemKey({ icon, name });
        return (
            <View key={key} style={styles.toolbarActionContainer}>
                {this.renderToolbarAction(styles, icon, name)}
            </View>
        );
    }
    renderAction = (styles:ActionButtonStyle, icon:IconPropTypes, name:string) => {
        const key = this.getActionItemKey({ icon, name });
        return (
            <View key={key} style={styles.speedDialActionIconContainer}>
                <View style={styles.speedDialActionIcon}>
                    <RippleFeedback
                        color={this.props.rippleColor}
                        onPress={() => this.onPress(key)}
                        delayPressIn={20}
                        useTouchableWithoutFeedback
                    >
                        {this.renderIconButton(styles, icon)}
                    </RippleFeedback>
                </View>
            </View>
        );
    }
    renderLabelAction = (styles:ActionButtonStyle, icon:IconPropTypes, label:string, name:string) => {
        const key = this.getActionItemKey({ icon, name });
        return (
            <View key={key} style={styles.speedDialActionContainer}>
                <View style={styles.speedDialActionLabelContainer}>
                    <Text style={styles.speedDialActionLabel}>{label}</Text>
                </View>
                {this.renderAction(styles, icon, name)}
            </View>
        );
    }
    renderIconButton = (styles:ActionButtonStyle, icon:IconPropTypes) => {

        const {style,...iconProps}=icon;

        let result=<Icon style={styles.icon}  {...iconProps} />;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} pointerEvents="box-only">
                {result}
            </View>
        );
    }
    renderButton = (styles:ActionButtonStyle) => (
        <Animated.View style={styles.positionContainer}>
            {this.renderMainButton(styles)}
        </Animated.View>
    );
    render() {
        const { render } = this.state;

        const styles = getStyles(this.props,this.state);

        if (render === 'toolbar') {
            return this.renderToolbarTransition(styles);
        } else if (render === 'speedDial') {
            return this.renderSpeedDialTransition(styles);
        }

        return this.renderButton(styles);
    }
}

export default ActionButton;

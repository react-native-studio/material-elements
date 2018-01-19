/**
 * 可产生水波纹
 */
import { View, Animated, StyleSheet, Platform, Easing, TouchableWithoutFeedback } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme'

import Color from 'color';
import { ELEVATION_ZINDEX } from '../styles/constants';
import Icon from '../Icon';

const propTypes = {
  /**
   * icon颜色
   */
  color: PropTypes.string,
    /**
    * icon按下的颜色
    */
    underlayColor: PropTypes.string,
    /**
    * 水波纹最大透明度
    */
    maxOpacity: PropTypes.number,
    /**
    * underlayColor的size
    */
    percent: PropTypes.number,
    /**
    * 是否可用
    */
    disabled: PropTypes.bool,
    /**
    * icon尺寸，默认24
    */
    size: PropTypes.number,
    /**
    * icon的name
    */
    name: PropTypes.string.isRequired,
    /**
    * It'll be used instead of icon (see props name) if exists
    */
    children: PropTypes.element,
    /**
    * 按下触发
    */
    onPress: PropTypes.func,
   /**
   * icon的类型
   */
   type:PropTypes.oneOf([
      Icon.iconType.Ionicons,
      Icon.iconType.MaterialCommunityIcons,
      Icon.iconType.MaterialIcons,
      Icon.FontAwesome,
    ])
};
const defaultProps = {
    children: null,
    onPress: null,
    color: null,
    underlayColor: null,
    size: 24,
    disabled: false,
    percent: 90,
    maxOpacity: 0.16,
    style: {},
};
function getStyles(props, state) {
    const { iconToggle, palette } =getTheme(props.theme);

    const local = {};

    if (props.color) {
        local.icon = {
            color: props.color,
        };
    }

    if (state.containerSize) {
        local.container = {
            width: state.containerSize,
            height: state.containerSize,
        };
    }

    return {
        container: [
            iconToggle.container,
            local.container,
            props.style.container,
        ],
        icon: [
            iconToggle.icon,
            local.icon,
            props.style.icon,
            // diabled has the highest priority - because user can use color props and disabled
            // together
            props.disabled && { color: palette.disabledColor },
        ],
    };
}
/**
* Returns size of icon. Priority order: style prop, size prop, spacing.iconSize.
*/
function getIconSize(props) {
    const { spacing } =getTheme(props.theme);
    const { icon } = props.style;

    if (icon && icon.width) {
        return icon.width;
    }
    if (props.size) {
        return props.size;
    }

    return spacing.iconSize;
}
function getContainerSize(iconSize) {
    return iconSize * 2;
}
function getRippleSize(containerSize, percent) {
    return (percent / 100) * containerSize;
}

class IconToggle extends PureComponent {
    constructor(props) {
        super(props);

        const iconSize = getIconSize(props);
        const containerSize = getContainerSize(iconSize);

        this.state = {
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(props.maxOpacity),
            containerSize,
            iconSize,
            rippleSize: getRippleSize(containerSize, props.percent),
        };

        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const iconSize = getIconSize(nextProps);
        if (this.state.iconSize !== iconSize || nextProps.percent !== this.props.percent) {
            const containerSize = getContainerSize(iconSize);

            this.setState({
                containerSize,
                iconSize,
                rippleSize: getRippleSize(containerSize, nextProps.percent),
            });
        }
    }
    onPressIn() {
        const { disabled } = this.props;

        if (!disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 225,
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                useNativeDriver: Platform.OS === 'android',
            }).start();
        }
    }
    onPressOut() {
        const { disabled, onPress, maxOpacity } = this.props;

        if (!disabled) {
            Animated.timing(this.state.opacityValue, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
            }).start(() => {
                this.state.scaleValue.setValue(0.01);
                this.state.opacityValue.setValue(maxOpacity);
            });

            if (onPress) {
                onPress();
            }
        }
    }
    renderRippleView = (styles) => {
        const { scaleValue, opacityValue, containerSize, rippleSize } = this.state;

        const color = Color(StyleSheet.flatten(styles.icon).color);
        // https://material.google.com/components/buttons.html#buttons-toggle-buttons
        this.maxOpacity = color.dark() ? 0.12 : 0.30;

        const top = (containerSize - rippleSize) / 2;

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top,
                    left: top,
                    width: rippleSize,
                    height: rippleSize,
                    borderRadius: (rippleSize) / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: color.toString(),
                    // we need set zindex for iOS, because the components with elevation have the
                    // zindex set as well, thus, there could be displayed backgroundColor of
                    // component with bigger zindex - and that's not good
                    zIndex: Platform.OS === 'ios' ? ELEVATION_ZINDEX : null,
                }]}
            />
        );
    }
    renderIcon = (styles) => {
        const { name, children,type } = this.props;
        const { iconSize } = this.state;

        if (children) {
            return children;
        }

        const color = StyleSheet.flatten(styles.icon).color;

        return <Icon name={name} color={color} type={type} size={iconSize} />;
    }
    render() {
        const styles = getStyles(this.props, this.state);

        return (
            <TouchableWithoutFeedback onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                <View>
                    {this.renderRippleView(styles)}
                    <View style={styles.container}>
                        {this.renderIcon(styles)}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

IconToggle.propTypes = propTypes;
IconToggle.defaultProps = defaultProps;
export default IconToggle;

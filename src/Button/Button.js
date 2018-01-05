/**
 * Button组件,使用ES6重写
 */
import { View, Text, StyleSheet } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from '../utils';

import Icon from '../Icon';
import RippleFeedback from '../RippleFeedback';
import getPlatformElevation from '../styles/getPlatformElevation';
const propTypes = {
    /**
    * button组件是否可用
    */
    disabled: PropTypes.bool,
    /**
    * button组件是否凸起
    */
    raised: PropTypes.bool,
    /**
    * 按下时触发，传递text参数
    */
    onPress: PropTypes.func,
    /**
    * 长按触发，传递text参数
    */
    onLongPress: PropTypes.func,
    /**
    * text将被显示
    */
    title: PropTypes.string.isRequired,
    /**
    * 是否转换大写
    */
    upperCase: PropTypes.bool,
    /**
    * 展示图标，展示在text之前
    */
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    /**
    * 重写button样式和text样式
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        text: Text.propTypes.style,
    }),
};
const defaultProps = {
    icon: null,
    onPress: null,
    onLongPress: null,
    primary: false,
    accent: false,
    disabled: false,
    raised: false,
    upperCase: true,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context, state) {
    const {
        button,
        buttonFlat,
        buttonRaised,
        buttonDisabled,
        buttonRaisedDisabled,
    } = context.uiTheme;

    const { primary, accent, disabled, raised } = props;
    const { palette } = context.uiTheme;

    const local = {
        container: {},
    };

    if (!disabled) {
        if (primary && !raised) {
            local.text = { color: palette.primaryColor };
        } else if (accent && !raised) {
            local.text = { color: palette.accentColor };
        }

        if (primary && raised) {
            local.container.backgroundColor = palette.primaryColor;
            local.text = { color: palette.canvasColor };
        } else if (accent && raised) {
            local.container.backgroundColor = palette.accentColor;
            local.text = { color: palette.canvasColor };
        }
    }

    if (raised && !disabled) {
        local.container = {
            ...local.container,
            ...getPlatformElevation(state.elevation),
        };
    }

    return {
        container: [
            button.container,
            !raised && buttonFlat.container,
            raised && buttonRaised.container,
            (!raised && disabled) && buttonDisabled.container,
            (raised && disabled) && buttonRaisedDisabled.container,
            local.container,
            props.style.container,
        ],
        text: [
            button.text,
            !raised && buttonFlat.text,
            raised && buttonRaised.text,
            (!raised && disabled) && buttonDisabled.text,
            (raised && disabled) && buttonRaisedDisabled.text,
            local.text,
            props.style.text,
        ],
        icon: [
            button.icon,
            !raised && buttonFlat.icon,
            disabled && buttonDisabled.icon,
            raised && buttonRaised.icon,
            local.icon,
            props.style.icon,
        ],
    };
}

class Button extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            elevation: 2,//高程为2
        };
    }
    onPress = () => {
        const { text, onPress } = this.props;

        if (onPress) {
            onPress(text);
        }
    }
    setElevation = () => {
        this.setState({
            elevation: 4,
        });
    };

    removeElevation = () => {
        this.setState({
            elevation: 2,
        });
    };
    renderIcon = (styles) => {
        const { icon } = this.props;
        const textFlatten = StyleSheet.flatten(styles.text);

        if (!icon) {
            return null;
        }

        let result;

        if (React.isValidElement(icon)) {
            result = icon;
        } else if (typeof icon === 'string') {
            result = (
                <Icon
                    name={icon}
                    color={textFlatten.color}
                    style={styles.icon}
                    size={24}
                />);
        }

        return result;
    }
    render() {
        const { text, disabled, raised, upperCase, onLongPress } = this.props;

        const styles = getStyles(this.props, this.context, this.state);

        const content = (
            <View style={styles.container} pointerEvents="box-only">
                {this.renderIcon(styles)}
                <Text style={styles.text}>
                    {upperCase ? text.toUpperCase() : text}
                </Text>
            </View>
        );

        if (disabled) {
            return content;
        }

        return (
            <RippleFeedback
                onPress={!disabled ? this.onPress : null}
                onLongPress={!disabled ? onLongPress : null}
                onPressIn={raised ? this.setElevation : null}
                onPressOut={raised ? this.removeElevation : null}
                delayPressIn={50}
            >
                {content}
            </RippleFeedback>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;

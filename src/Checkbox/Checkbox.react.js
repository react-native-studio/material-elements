/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
import getTheme from '../styles/getTheme';
import merge from 'lodash/merge';
import light from '../styles/themes/light'
const defaultProps = {
    checked: false,
    checkedIcon: 'check-box',
    uncheckedIcon: 'check-box-outline-blank',
    disabled: false,
    style: {},
};
class Checkbox extends PureComponent {
    static propTypes= {
        /**
         * Text will be shown after Icon
         */
        label: PropTypes.string.isRequired,
        /**
         * Value will be returned when onCheck is fired
         */
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        /**
         * True if it's check
         */
        checked: PropTypes.bool,
        /**
         * Is checkbox active
         */
        disabled: PropTypes.bool,
        /**
         * Will be shown when checked is false
         */
        uncheckedIcon: PropTypes.string,
        /**
         * Will be shown when checked is true
         */
        checkedIcon: PropTypes.string,
        /**
         * Event that is called when state is changed
         */
        onCheck: PropTypes.func.isRequired,
    }
    _getStyles(){
            const { checkbox} =getTheme(this.props.theme);

            const {palette}=merge(light,this.props.theme);
            const { disabled } = this.props;

            const local = {};

            return {
                container: [
                    checkbox.container,
                    local.container,
                    this.props.style.container,
                ],
                icon: [
                    checkbox.icon,
                    this.props.style.icon,
                ],
                label: [
                    checkbox.label,
                    local.label,
                    this.props.style.label,
                    // disabled has the highest priority
                    disabled && { color: palette.disabledTextColor },
                ],
            };
    }
    onPress = () => {
        const { checked, disabled, onCheck, value } = this.props;

        if (!disabled && onCheck) {
            onCheck(!checked, value);
        }
    }
    render() {
        const { checked, checkedIcon, uncheckedIcon, disabled, value } = this.props;

        const styles =this._getStyles();

        const labelColor = StyleSheet.flatten(styles.label).color;
        const iconColor = StyleSheet.flatten(styles.icon).color;

        const content = (
            <View style={styles.container} pointerEvents="box-only">
                <IconToggle
                    key={`${value}-${checked}`}
                    name={checked ? checkedIcon : uncheckedIcon}
                    disabled={disabled}
                    color={checked ? iconColor : labelColor}
                    onPress={this.onPress}
                />
                <Text style={styles.label}>
                    {this.props.label}
                </Text>
            </View>
        );

        if (disabled) {
            return content;
        }

        return (
            <RippleFeedback onPress={this.onPress}>
                {content}
            </RippleFeedback>
        );
    }
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;

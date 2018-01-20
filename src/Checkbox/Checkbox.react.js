import { StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
import getTheme from '../styles/getTheme';
import merge from 'lodash/merge';
import light from '../styles/themes/light'
const defaultProps = {
    checked: false,
    checkedIcon: {
      name:'check-box',
    },
    uncheckedIcon: {
      name:'check-box-outline-blank',
    },
    disabled: false,
};
class Checkbox extends PureComponent {
    static propTypes= {
        /**
         * 是否选中
         */
        checked: PropTypes.bool,
        /**
         * checkbox是否有用
         */
        disabled: PropTypes.bool,
        /**
         * 当checked为false是展现的icon
         */
        uncheckedIcon:PropTypes.shape({
          name:PropTypes.string,
          size:PropTypes.number,
          color:PropTypes.string,
          type:PropTypes.string,
        }),
        /**
         * Event that is called when state is changed
         */
        onCheck: PropTypes.func.isRequired,
        /**
         * 当checked为true是展现的icon
        */
        checkedIcon:PropTypes.shape({
          name:PropTypes.string,
          size:PropTypes.number,
          color:PropTypes.string,
          type:PropTypes.string,
        })
    }
    _getStyles(){
            const { checkbox} =getTheme(this.props.theme);

            const {checkedIcon,uncheckedIcon}=this.props;
            return {
                checkedIcon:[checkbox.checkedIcon,
                checkedIcon.color&&{color: this.props.checkedIcon.color},
                ],
                uncheckedIcon: [
                  checkbox.uncheckedIcon,
                  uncheckedIcon.color&&{color: this.props.uncheckedIcon.color,},
                ],
            };
    }
    onPress = () => {
        const { checked, disabled, onCheck } = this.props;

        if (!disabled && onCheck) {
            onCheck(!checked);
        }
    }
    render() {
        const { checked, checkedIcon, uncheckedIcon, disabled } = this.props;

        const styles =this._getStyles();

        const uncheckedIconColor = StyleSheet.flatten(styles.uncheckedIcon).color;
        const checkedIconColor = StyleSheet.flatten(styles.checkedIcon).color;
        console.log(checkedIconColor)
        const checkedIconProps={
          name:checkedIcon.name,
          size:checkedIcon.size,
          type:checkedIcon.type,
          color:checkedIconColor,
        }
        const uncheckedIconProps={
          name:uncheckedIcon.name,
          size:uncheckedIcon.size,
          type:uncheckedIcon.type,
          color:uncheckedIconColor
        }
        let iconProps=checked?checkedIconProps:uncheckedIconProps;
        let content=(
            <IconToggle
              {...iconProps}
              disabled={disabled}
              onPress={this.onPress}
            />
          )
        return content;
    }
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;

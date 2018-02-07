/**
 * @flow
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import type { IconPropTypes } from '../TypeDifinition/index'
import getTheme from '../styles/getTheme';
import IconToggle from '../IconToggle';
import merge from 'lodash/merge';
type CheckboxProps={
  checked:boolean,
  onCheck?:(value:boolean)=>void,
  disabled?:boolean,
  uncheckedIcon?:IconPropTypes,
  checkedIcon?:IconPropTypes,
}
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
class Checkbox extends React.PureComponent<CheckboxProps>{
  props:CheckboxProps
  static defaultProps:typeof defaultProps
  static defaultProps=defaultProps
  getStyles(){
    const { checkbox} =getTheme();

    const {checkedIcon,uncheckedIcon}=this.props;

    return {
      checkedIcon:[checkbox.checkedIcon,
        checkedIcon&&checkedIcon.color&&{color: checkedIcon.color},
      ],
      uncheckedIcon: [
        checkbox.uncheckedIcon,
        uncheckedIcon&&uncheckedIcon.color&&{color: uncheckedIcon.color,},
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

    const styles =this.getStyles();

    const uncheckedIconColor = StyleSheet.flatten(styles.uncheckedIcon).color;
    const checkedIconColor = StyleSheet.flatten(styles.checkedIcon).color;

    const checkedIconProps=checkedIcon&&{
      name:checkedIcon.name,
      size:checkedIcon.size,
      type:checkedIcon.type,
      color:checkedIconColor,
    }
    const uncheckedIconProps=uncheckedIcon&&{
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
export default Checkbox;
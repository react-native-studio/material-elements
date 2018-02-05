/**
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import getTheme from '../styles/getTheme';
import Icon from '../Icon/Icon.flow';
import RippleFeedBack from '../RippleFeedback';
import type {IconPropTypes} from '../TypeDifinition';
import { ViewPropTypes } from '../utils/index';
type StyleTypes={
  container?:ViewPropTypes.style,
  text?:Text.propTypes.style,
  icon?:Icon.propTypes.style,
}
type BSListItemProps={
  icon?:IconPropTypes,
  text:string,
  style:StyleTypes,
  onPress?:()=>void,
}

const defaultProps={
   style:{},
}
class BSListItem extends Component<BSListItemProps> {
  props:BSListItemProps
  static defaultProps:typeof defaultProps
  static defaultProps=defaultProps
  getStyles = () => {
    const {bottomSheetListItem} = getTheme()

    const {props} = this

    return {
      container: [
        bottomSheetListItem.container,
        props.style.container,
      ],
      text: [
        bottomSheetListItem.text,
        props.style.text,
      ],
      icon: [
        bottomSheetListItem.icon,
        props.style.icon,
      ]
    }
  }

  renderIcon = (styles:StyleTypes) => {

    const {icon} = this.props

    if (!icon) {
      return null
    }

    const {name, color, size, type} = icon

    const iconSize = size || 24

    const iconProps = {
      name,
      color,
      type,
      size: iconSize,
    }

    return <Icon style={styles.icon} {...iconProps}/>

  }

  render(){

    const styles=this.getStyles();

    const {text,onPress}=this.props;

    return(
      <RippleFeedBack onPress={onPress}>
        <View style={styles.container}>
        {this.renderIcon(styles)}
        <Text style={styles.text}>{text}</Text>
        </View>
      </RippleFeedBack>
    )
  }
}

export default BSListItem

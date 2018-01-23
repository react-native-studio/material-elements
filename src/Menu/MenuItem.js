import React from 'react';
import { StyleSheet, Text, TouchableHighlight ,View} from 'react-native';
import Ripple from '../Ripple';

import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';

import Icon from '../Icon'

class MenuItem extends React.PureComponent{

  static propTypes={
    disabled: PropTypes.bool,
    disabledTextColor: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: TouchableHighlight.propTypes.underlayColor,
    text:PropTypes.string,
    icon:PropTypes.shape({
      ...Icon.propTypes
    })
  }

  getStyles=()=>{

    const {style}=this.props;

    const {menuItem}=getTheme();

    return {
      container:[
        menuItem.container,
        style.container,
      ],
      text:[
        menuItem.text,
        style.text,
      ],
      icon:[
        menuItem.icon,
        style.icon,
      ]
    }
  }
  renderIcon=(styles)=>{

    const {icon,disabledTextColor,disabled}=this.props;


    if(!icon){
      return null;
    }
    const {name,size,type,color}=icon;
    const iconProps={
      name,
      size,
      type,
      color:disabled?disabledTextColor:color,
    }
    return (
      <Icon style={styles.icon} {...iconProps}/>
    )
  }
  render(){
    const {disabled,onPress,underlayColor,disabledTextColor,text}=this.props;

    const styles=this.getStyles();

    return  (
      <TouchableHighlight disabled={disabled} onPress={onPress} underlayColor={underlayColor}>
        <View style={styles.container}>
          {this.renderIcon(styles)}
        <Text
          numberOfLines={1}
          style={[styles.text,
            disabled && { color: disabledTextColor },

          ]}
        >
          {text}
        </Text>
        </View>
      </TouchableHighlight>
    )
  }
 };

MenuItem.defaultProps = {
  disabled: false,
  disabledTextColor: 'rgb(189,189,189)',
  underlayColor: 'rgb(224,224,224)',
  style:{}
};
export default MenuItem;

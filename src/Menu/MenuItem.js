import React from 'react';
import { Text, TouchableHighlight ,View} from 'react-native';

import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';

import Icon from '../Icon'
import { ViewPropTypes } from '../utils/index'

class MenuItem extends React.PureComponent{

  static propTypes={
    /**
     * item是否可用
     */
    disabled: PropTypes.bool,
    /**
     * disabled为true时text的颜色
     */
    disabledTextColor: PropTypes.string,
    /**
     * item 按下时触发
     */
    onPress: PropTypes.func,
    /**
     * item按下时的颜色，
     */
    underlayColor: TouchableHighlight.propTypes.underlayColor,
    /**
     * item中的text
     */
    text:PropTypes.string,
    /**
     * item中的icon
     */
    icon:PropTypes.shape({
      ...Icon.propTypes
    }),
    /**
     * 自定义的style
     */
    style:PropTypes.shape({
      container:ViewPropTypes.style,
      text:Text.propTypes.style,
      icon:PropTypes.object,
    }),
    containerStyle:ViewPropTypes.style,
    textStyle:Text.propTypes.style,
    iconStyle:Text.propTypes.style,
  }

  getStyles=()=>{

    const {
      style,
      containerStyle,
      textStyle,
      iconStyle,
    }=this.props;

    const {menuItem}=getTheme();

    return {
      container:[
        menuItem.container,
        style.container,
        containerStyle,
      ],
      text:[
        menuItem.text,
        style.text,
        textStyle,
      ],
      icon:[
        menuItem.icon,
        style.icon,
        iconStyle,
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

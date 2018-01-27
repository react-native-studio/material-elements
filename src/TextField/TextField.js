import React,{Component} from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';
import PropTypes from 'prop-types';
import TextFieldBase from './TextFieldBase';
import Icon from '../Icon';
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'
export default class TextField extends Component{
  static propTypes={
    icon:PropTypes.shape({
      name:PropTypes.string,
      size:PropTypes.number,
      color:PropTypes.string,
      type:PropTypes.string,
    }),
    errorMessage:PropTypes.string,
    carryErrorMessage:PropTypes.bool,
    style:PropTypes.shape({
      icon:Icon.propTypes.style,
      errorMessage:Text.propTypes.style,
    }),
    ...TextFieldBase.propTypes,
  }
  static defaultProps={
    carryErrorMessage:true,
    style:{},
    icon:{}
  }
  getStyles=()=>{

    const {textField}=getTheme();
    const {style}=this.props;

    return {
      errorMessage:[
             textField.errorMessage,
             style.errorMessage,
           ],
      icon:[
        textField.icon,
        style.icon,
      ]
    }
  }
  render(){
    const styles=this.getStyles();
    const {
      icon,
      carryErrorMessage,
      errorMessage,
      style,
      ...props}=this.props;

    const iconProps={
      name:icon.name,
      type:icon.type,
      size:icon.size,
      color:icon.color,
    }

  return(
    <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'center'}}>
      {icon.name?<Icon {...iconProps} style={styles.icon}/>:null}
      <View style={{flex:1}}>
        <TextFieldBase {...props}/>
        { carryErrorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    </View>
  )
  }
}

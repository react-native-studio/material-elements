import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Toast from '../Toast'
import Button from '../Button'
export default class ToastExample extends Component{
  render(){
  return(<View style={{flex:1,paddingTop:20}}>
    <Button text="shortToast" onPress={()=>this.toast && this.toast.show('toast')}/>
    <Button text="loginToast" onPress={()=>this.toast && this.toast.show('toast',Toast.LONG)}/>

    <Toast ref={toast=>this.toast=toast}/>
  </View>)
  }
}

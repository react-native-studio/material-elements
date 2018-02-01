import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
export default class CenterContainer extends Component{
  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        {this.props.children}
      </View>
    )
  }
}

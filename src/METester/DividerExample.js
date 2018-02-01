import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import CenterContainer from './CenterContainer';
import Divider from '../Divider/Divider.flow';
export default class DividerExample extends Component{
  render(){
    return(
     <View>
        <Divider style={{container:{height:1,marginBottom:5}}}/>
       <Divider style={{container:{height:1,backgroundColor:'red'}}} inset/>
      </View>
    )
  }
}

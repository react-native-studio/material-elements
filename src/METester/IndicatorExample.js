import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import Indicator from '../Indicator'
import PropTypes from 'prop-types';
export default class IndicatorExample extends Component{
  render(){
    return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Indicator/>
    </View>)
  }
}

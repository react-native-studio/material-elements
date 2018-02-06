import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Badge from '../Badge'
export default class BadgeExmaple extends Component{
  render(){
    return(<View style={{flex:1,paddingVertical:20}}>
      <Badge text="12">
        <Text>Badge</Text>
      </Badge>
    </View>)
  }
}

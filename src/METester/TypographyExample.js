import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Typography from '../Typography/Typography'
export default class TypographyExample extends Component{
  render(){
    return(<View style={{flex:1}}>
      <Typography variant="display4">display4</Typography>
      <Typography variant="display3">display3</Typography>
      <Typography variant="display2">display2</Typography>
      <Typography variant="display1">display1</Typography>
      <Typography variant="headline">headline</Typography>
      <Typography variant="title">title</Typography>
      <Typography variant="subheading">subheading</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography>body1</Typography>
      <Typography variant="caption">caption</Typography>
      <Typography variant="button">button</Typography>

    </View>)
  }
}

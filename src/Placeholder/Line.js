import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
export default class Line extends Component{
  static propTypes={
    textSize :PropTypes.number, color:PropTypes.string, width :PropTypes.string,
  }
  render(){
  return(<Placeholder.Line {...this.props}/>)
  }
}

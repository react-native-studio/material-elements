import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder'
export default class Media extends Component{
  static propTypes={
    size :PropTypes.number,
    hasRadius :PropTypes.bool,
    color :PropTypes.string,
  }
  render(){
  return(<Placeholder.Media {...this.props}/>)
  }
}

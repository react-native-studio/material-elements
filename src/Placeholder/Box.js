import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
export default class Box extends Component{
  static propTypes={
    height:PropTypes.number,
    width:PropTypes.number,
    radius:PropTypes.number,
    color:PropTypes.string,
  }
  render(){
  return(<Placeholder.Box {...this.props}/>)
  }
}

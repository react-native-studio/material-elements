import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
export default class Paragraph extends Component{
  static propTypes={
    lineNumber: PropTypes.number.isRequired,
    textSize: PropTypes.number,
    lineSpacing: PropTypes.number,
    color: PropTypes.string,
    width: PropTypes.string,
    lastLineWidth: PropTypes.string,
    firstLineWidth: PropTypes.string,
  }
  render(){
  return(<Placeholder.Paragraph {...this.props}/>)
  }
}

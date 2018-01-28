import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
export default class ImageContent extends Component{
  static propTypes = {
    position: PropTypes.string,
    size: PropTypes.number,
    hasRadius: PropTypes.bool,
    animate: PropTypes.string,
    lineNumber: PropTypes.number.isRequired,
    textSize: PropTypes.number,
    lineSpacing: PropTypes.number,
    color: PropTypes.string,
    width: PropTypes.string,
    lastLineWidth: PropTypes.string,
    firstLineWidth: PropTypes.string,
  }
  render(){
  return(<Placeholder.ImageContent {...this.props}/>)
  }
}

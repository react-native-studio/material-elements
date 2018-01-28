import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
export default class MultiWords extends Component{
  static propTypes={
    words: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.string.isRequired,
      }),
    ),
    textSize: PropTypes.number,
  }
  render(){
  return(<Placeholder.MultiWords {...this.props}/>)
  }
}

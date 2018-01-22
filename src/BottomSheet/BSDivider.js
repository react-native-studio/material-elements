import React,{Component} from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';
import merge from 'lodash/merge';

const {width}=Dimensions.get('window');

const defaultProps={
  style:{
    container:{}
  }
}

class BSDivider extends Component{

  getStyles=()=>{

    const {style}=this.props;
    /**
     * constainer:{
      height:1, backgroundColor:Color('#000').alpha(0.2),
      marginTop:7,
      marginBottom:8,
      width:width,
      }},style.container
     */
    return StyleSheet.create(merge({
      container:{
        height:1, backgroundColor:Color('#000').alpha(0.2),
        marginTop:7,
        marginBottom:8,
        width:width,
      }
    },style))

  }

  render(){
    const styles=this.getStyles();
    return(<View style={styles.container}/>)
  }
}
BSDivider.defaultProps=defaultProps;
export default BSDivider;

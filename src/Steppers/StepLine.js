/**
 * @flow
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {grey400} from '../styles/colors';
type StepLinePropTypes={
  horizontal?:boolean,
}
const defaultProps={
  horizontal:true,
}
class StepLine extends Component<StepLinePropTypes>{
  props:StepLinePropTypes
  static defaultProps:typeof defaultProps
  render(){
    const {horizontal}=this.props;
    return(
      <View
        style={horizontal?styles.line_h:styles.line_v}
      />
    )
  }
}
const styles=StyleSheet.create({
  line_v:{
    width:1,
    height:60,
    backgroundColor:grey400
  },
  line_h:{
    height:1,
    backgroundColor:grey400,
    width:60,
  }
})
StepLine.defaultProps=defaultProps;
export default StepLine;

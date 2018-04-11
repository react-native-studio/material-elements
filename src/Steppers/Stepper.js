/**
 * @flow
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
type StepperPropTypes={
  steps?:Array<{label:string,state:string}>,
  horizontal?:boolean,
  linear?:boolean
}
const defaultProps={
  horizontal:true,
}
class Stepper extends Component<StepperPropTypes>{
  props:StepperPropTypes
  static defaultProps:typeof defaultProps=defaultProps
  render(){
    return(<View>
      <View style={styles.container}>

    </View>
    </View>)
  }
}
const styles=StyleSheet.create({
  container:{
    justifyContent:'center',alignItems:'center'
  }
})
export default Stepper;

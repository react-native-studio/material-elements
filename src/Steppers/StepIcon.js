/**
 * @flow
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import IconToggle from '../IconToggle'
import StepLine from "./StepLine";
import Color from 'color'
type StepIconPropTypes={
  color?:string,
  text?:string,
  name?:string,
  leftLine?:boolean,
  horizontal?:boolean,
  rightLine?:boolean,
}
const defaultProps={
  color:Color('black').alpha(0.38).toString(),
  leftLine:true,
  horizontal:true,
  rightLine:true,
}
class StepIcon extends Component<StepIconPropTypes>{

  props:StepIconPropTypes
  static defaultProps:typeof defaultProps=defaultProps

  componentDidMount(){
  }
  renderIcon=()=>{
    const {text,color,name}=this.props;
    if(text){
      return (
        <IconToggle color={color}>
          <View style={[styles.icon,{backgroundColor:color}]}>
            <Text style={{color:'white'}}>{text}</Text>
          </View>
        </IconToggle>
      )
    }
    if(name){
      return (
        <IconToggle name={name} color={color}/>
      )
    }

  }
  render(){
    const {leftLine,rightLine,horizontal}=this.props;
    let flexDirection=horizontal?'row':'column';
    return(
      <View style={[styles.container,{flexDirection}]}>
        {leftLine&&<StepLine horizontal={horizontal}/>}
        {this.renderIcon()}
        {rightLine&&<StepLine horizontal={horizontal}/>}
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  icon:{
    backgroundColor:Color('black').alpha(0.38).toString(),
    width:24,
    height:24,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default StepIcon;

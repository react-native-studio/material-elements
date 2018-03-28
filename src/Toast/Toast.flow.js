/**
 * @flow
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import getTheme from '../styles/getTheme';
import * as Animatable from 'react-native-animatable';
import { ViewPropTypes } from '../utils/index';

type StyleProps={
  container?: ViewPropTypes.style,
  textContainer?: ViewPropTypes.style,
  text?: Text.propTypes.style,
}
type ToastProps={
  style:StyleProps | typeof defaultProps.style
}
type ToastState={
  visible:boolean,
  text:string,
}
const defaultProps={
  style:{}
}
const DURATION={
  LONG:3500,
  SHORT:2100,
}
class Toast extends Component<ToastProps,ToastState>{
  static defaultProps:typeof defaultProps=defaultProps
  props:ToastProps
  state:ToastState
  static SHORT:2100
  static LONG:3500
  toast:any
  state={
    visible:false,
    text:''
  }
  timer:TimeoutID

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer)
  }
  show=(text:string,timeout:number):void=>{

    const {visible}=this.state;

    const time=timeout || DURATION.SHORT;

    if(visible || !text)return;

    this.setState({visible:true,text},()=>{

    this.timer=setTimeout(()=>{
        this.hide();
      },time)
    })
  }
  hide=():void=>{

    const {visible}=this.state;

    if(!visible)return;

    this.toast && this.toast.fadeOut(1000).then(()=>{
      this.setState({
        visible:false
      })
    })
  }
  getStyles=():StyleProps=>{

    const {toast}=getTheme();

    const {style}=this.props;

    return {
      container:[
        toast.container,
        style.container,
      ],
      textContainer:[
        toast.textContainer,
        style.textContainer,
      ],
      text:[
        toast.text,
        style.text,
      ]

    }
  }
  render(){
    const styles=this.getStyles();

    const {visible,text}=this.state;

    return(visible?
        <Animatable.View
          useNativeDriver
          duration={400}
          ref={ref=>this.toast=ref}
          animation="fadeIn"
          pointerEvents="none"
          style={styles.container}>
          <View style={{flex:1}}/>
          <View style={styles.textContainer}>
            <Text  style={styles.text}>{text}</Text>
          </View>
          <View style={{flex:1}}/>
        </Animatable.View>:null
    )
  }
}
Toast.LONG=DURATION.LONG;
Toast.SHORT=DURATION.SHORT;
export default Toast

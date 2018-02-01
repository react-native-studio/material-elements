
import React,{Component} from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import * as Animatable from 'react-native-animatable';
import { ViewPropTypes } from '../utils/index';


const defaultProps={
  style:{}
}

const DURATION={
  LONG:3500,
  SHORT:2100,
}
const POSITION={

}
class Toast extends React.PureComponent{

  static propTypes={
    /**
     * 自定义style
     */
    style:PropTypes.shape({
      container:ViewPropTypes.style,
      textContainer:ViewPropTypes.style,
      text:Text.propTypes.style,
    })
  }

  state={
    visible:false
  }

  show=(text,timeout)=>{

    const {visible}=this.state;

    const time=timeout || DURATION.SHORT;

    if(visible || !text)return;

    this.setState({visible:true,text},()=>{

      setTimeout(()=>{
        this.hide();
      },time)
    })
  }

  getStyles=()=>{

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

  hide=()=>{

    const {visible}=this.state;

     if(!visible)return;

    this.toast && this.toast.fadeOut(1000).then(()=>{
      this.setState({
        visible:false
      })
    })
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
Toast.defaultProps=defaultProps;
export default Toast;

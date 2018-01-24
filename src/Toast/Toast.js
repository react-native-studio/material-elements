import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import * as Animatable from 'react-native-animatable';

const defaultProps={
  style:{}
}
class Toast extends React.PureComponent{

  state={
    visible:false
  }

  show=(timeout)=>{

    const {visible}=this.state;

    const time=timeout || 2000;

    if(visible)return;

    this.setState({visible:true},()=>{

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

    this.toast && this.toast.fadeOut(375).then(()=>{
      this.setState({
        visible:false
      })
    })
  }

  render(){

    const styles=this.getStyles();

    const {text}=this.props;

    const {visible}=this.state;

    return(visible?
        <Animatable.View ref={ref=>this.toast=ref} animation="fadeIn" pointerEvents="none" style={styles.container}>
          <View style={{flex:1}}/>
          <View style={styles.textContainer}>
            <Text  style={styles.text}>{text}</Text>
          </View>
          <View style={{flex:1}}/>
        </Animatable.View>:null
    )
  }
}
Toast.defaultProps=defaultProps;
export default Toast;

'use strict';
import React, {Component} from "react";
import {StyleSheet, Animated,Text} from "react-native";
import PropTypes from 'prop-types'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

export default class FloatingLabel extends Component {
  static propTypes={
    duration: PropTypes.number,
    label: PropTypes.string,
    labelColor: PropTypes.string,
    highlightColor: PropTypes.string,
    style: PropTypes.shape({
      container:Text.propTypes.style,
      focusText:Text.propTypes.style
    }),
    isFocused:PropTypes.bool,
    focusHandler:PropTypes.func,
  }
  constructor(props: Object) {
    super(props);
    this.state = {
      translateY:new Animated.Value(0),
      scale:new Animated.Value(1)
    };
  }
  shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
    return (this.props.hasValue !== nextProps.hasValue) ? false : true;
  }
  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: -24,
        duration: this.props.duration,
        useNativeDriver:true,
      }),
      Animated.timing(this.state.scale, {
        toValue: 12/16,
        duration: this.props.duration,
        useNativeDriver:true,
      })
    ]).start();
  }
  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: this.props.duration,
        useNativeDriver:true,
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: this.props.duration,
        useNativeDriver:true,
      })
    ]).start();
  }

  getStyles=()=>{
    const {textFieldLabel}=getTheme();

    const {style}=this.props;

    return {
      container:[
        textFieldLabel.container,
        style.container,
      ],
      focusText:[
        textFieldLabel.focusText,
        style.focusText,
      ]
    }
  }
  render() : Object {

    const styles=this.getStyles();
    let {
      label,
      labelColor,
      highlightColor,
      isFocused
    } = this.props;
    return (
      <Animated.Text
        style={[styles.container,{
          transform:[{translateY:this.state.translateY},{
            scale:this.state.scale,
          }],
        },{
          color:labelColor
        }, isFocused && styles.focusText, isFocused && highlightColor && {color:highlightColor}]}
        onPress={()=> {
          this.props.focusHandler();
        }}
      >
        {label}
      </Animated.Text>
    );
  }
}
FloatingLabel.defaultProps={
  style:{}
}

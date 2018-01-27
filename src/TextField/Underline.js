'use strict';
import React, {Component} from "react";
import {View, StyleSheet, Animated} from "react-native";

import PropTypes from 'prop-types'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

class Underline extends Component {
  static propTypes={
    duration: PropTypes.number,
    highlightColor: PropTypes.string,
    borderColor: PropTypes.string,
    style:PropTypes.shape({
      container:ViewPropTypes.style,
      underline:ViewPropTypes.style,
    })
  }
  constructor(props: Object) {
    super(props);
    this.state = {
      lineLength: 0,
      scale:new Animated.Value(0.01),
      opacity:new Animated.Value(0)
    };
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      if (this.refs.wrapper == null) {
        return;
      }
      const container = this.refs.wrapper;  // un-box animated view
      container.measure((left, top, width, height) => {
        this.setState({
          lineLength:width,
        })
      });
    });
  }
  expandLine() {

    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: this.props.duration,
        useNativeDriver:true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: this.props.duration,
        useNativeDriver:true,
      })
    ]).start()

  }
  shrinkLine() {
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 0.01,
        duration: this.props.duration,
        useNativeDriver:true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.duration,
        useNativeDriver:true,
      })
    ]).start()
  }
  getStyles=()=>{

    const {textFieldUnderline}=getTheme();

    const {style}=this.props;

    return {
      container:[
        textFieldUnderline.container,
        style.container,
      ],
      underline:[
        textFieldUnderline.underline,
        style.underline,
      ]
    }
  }
  render() {

    const styles=this.getStyles();
    const {borderColor, highlightColor} = this.props;

    return (
      <View
        style={[styles.container, {
          backgroundColor: borderColor
        }]}
        ref="wrapper"
      >
        <Animated.View
          style={[styles.underline,highlightColor && {
            backgroundColor:highlightColor
          },{
            width: this.state.lineLength,
            opacity:this.state.opacity.interpolate({
              inputRange: [0,0.1, 1],
              outputRange: [0,1, 1],
            }),
            transform:[{
              scale:this.state.scale,
            }]
          }]}>
        </Animated.View>
      </View>
    );
  }
}

Underline.defaultProps={
  style:{}
}
export default Underline;


import React, { Component } from 'react';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import { ViewPropTypes } from '../utils/index';
import merge from 'lodash/merge';
import Color from 'color';

const {width}=Dimensions.get('window');
type BSDividerProps = {
  style?: ?{
    container: ViewPropTypes.style,
  }
}
const defaultProps={
  style:{}
}
class BSDivider extends Component<BSDividerProps> {
  props: BSDividerProps
  static defaultProps:typeof defaultProps=defaultProps
  getStyles = () => {

    const {style} = this.props

    return StyleSheet.create(merge({
      container: {
        height: 1, backgroundColor: Color('#000').alpha(0.2),
        marginTop: 7,
        marginBottom: 8,
        width: width,
      }
    }, style))

  }

  render () {
    const styles = this.getStyles()
    return (<View style={styles.container}/>)
  }
}
export default BSDivider;

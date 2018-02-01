/**
 * @flow
 */
import React,{PureComponent} from 'react';
import {Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,} from 'react-native';
import type {RippleFeedbackProps} from '../TypeDifinition';
import Color from 'color';

const defaultProps = {
  color: null,
  borderless: true,
  underlayColor:Color('#000').alpha(0.2)
};
function isCompatible() {
  if (Platform.OS === 'ios') {
    return false;
  }

  return Platform.Version >= 21;
}
class RippleFeedback extends PureComponent<RippleFeedbackProps>{
  props:RippleFeedbackProps
  static defaultProps:typeof defaultProps=defaultProps
  render() {
    const { children, color, borderless, ...otherProps } = this.props;

    if (Platform.OS === 'web') {
      return (
        <TouchableOpacity {...otherProps}>
          {children}
        </TouchableOpacity>
      );
    }

    if (!isCompatible()) {
      return (
        <TouchableHighlight {...otherProps} underlayColor={'rgb(224,224,224)'}>
          {children}
        </TouchableHighlight>
      );
    }

    // we need to get underlayColor as props to this RippleFeedback component, because we can't
    // TouchableNativeFeedback.Ripple function on iOS devices
    const mapProps = { ...otherProps };

    if (color) {
      mapProps.background = TouchableNativeFeedback.Ripple(color, borderless);
    }

    return (
      <TouchableNativeFeedback {...mapProps} >
        {children}
      </TouchableNativeFeedback>
    );
  }
}
export default RippleFeedback
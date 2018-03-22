/**
 * @flow
 */
import React,{PureComponent} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {material} from "./index";
type TypographyPropTypes={
  variant:string | typeof defaultProps.variant,
  style:{
    text?:Text.style,
  }
}
const defaultProps={
  variant:'body1'
}
class Typography extends PureComponent<TypographyPropTypes>{

  props:TypographyPropTypes

  static defaultProps:typeof defaultProps

  render(){
    const {style,variant}=this.props;
    const styles={
      text:[
        ...material[variant+'Object'],
        style.text,
      ]
    }

    return(<Text style={styles.text}/>)
  }
}
Typography.defaultProps=defaultProps
export default Typography;

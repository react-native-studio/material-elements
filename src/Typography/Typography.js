/**
 * @flow
 */
import React,{PureComponent} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { material } from "react-native-typography"
type TypographyPropTypes={
  variant:string | typeof defaultProps.variant,
  style:{
    text?:Text.style,
  },
  children?:string | typeof Text,
  textStyle?:Text.propTypes.style
}
const defaultProps={
  variant:'body1',
  style:{

  }
}
class Typography extends PureComponent<TypographyPropTypes>{

  props:TypographyPropTypes

  static defaultProps:typeof defaultProps

  render(){
    const {style,variant,children,textStyle}=this.props;
    const styles={
      text:[
        {...material[variant+'Object']},
        style.text,
        textStyle
      ]
    }

    return(<Text style={styles.text} children={children}/>)
  }
}
Typography.defaultProps=defaultProps
export default Typography;

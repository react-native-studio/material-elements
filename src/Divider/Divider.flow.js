/**
 * @providesModule Divider
 * @flow
 */
import React from 'react'
import { View } from 'react-native'
import getTheme from '../styles/getTheme'
import {ViewPropTypes} from "../utils/index";
/**
 * Divider组件的属性
 */
export type DividerProps={
  /**
   * 是否嵌入，如果为真，则marginLeft ：72
   */
  inset?: boolean,
  /**
   * divider样式
   */
  style: {
    container?:ViewPropTypes.style
  },
}
const defaultProps = {
  inset: false,
  style: {},
}

class Divider extends React.PureComponent<DividerProps> {
  props: DividerProps
  static defaultProps: typeof defaultProps

  getStyles = () => {
    let props = this.props
    const {divider} = getTheme()

    const local = {
      container: props.inset ? {marginLeft: 72} : null,
    }

    return {
      container: [
        divider.container,
        local.container,
        props.style.container,
      ],
    }

  }

  render () {
    
    const styles = this.getStyles()

    return (
      <View style={styles.container}/>
    )
  }
}
Divider.defaultProps=defaultProps;
export default Divider

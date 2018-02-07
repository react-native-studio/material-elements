/**
 * @flow
 */
import { View, Text } from 'react-native'
import React, { PureComponent } from 'react'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

const defaultProps = {
  style: {},
}
type props = {
  children: any,
  style: {
    titleContainer?: ViewPropTypes.style,
    titleText?:Text.propTypes.style,
  }
}

class DialogHeader extends PureComponent<props> {
  props:props
  static defaultProps:typeof defaultProps=defaultProps
  getStyles = () => {
    let props = this.props

    const {dialog} = getTheme()

    return {
      titleContainer: [
        dialog.titleContainer,
        props.style.titleContainer,
      ],
      titleText: [
        dialog.titleText,
        props.style.titleText,
      ],
    }
  }

  render () {
    const {children} = this.props

    const styles = this.getStyles()

    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {children}
        </Text>
      </View>
    )
  }
}
export default DialogHeader

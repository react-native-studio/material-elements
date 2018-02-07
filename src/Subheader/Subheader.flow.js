/**
 * @flow
 */
import { View, Text } from 'react-native'
import React, { PureComponent } from 'react'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

const defaultProps = {
  style: {},
  inset: false,
  lines: 1,
}
type props = {
  text: string,
  inset?: boolean,
  lines?: number,
  style: {
    container?: ViewPropTypes.style,
    text?: Text.propTypes.style
  }
}

class Subheader extends PureComponent<props> {

  props: props
  static defaultProps: typeof defaultProps
  getStyles = () => {
    const {subheader} = getTheme()
    return {
      container: [
        subheader.container,
        {paddingLeft: this.props.inset ? 72 : 16},
        this.props.style.container,
      ],
      text: [
        subheader.text,
        this.props.style.text,
      ],
    }
  }

  render () {
    const {text, lines} = this.props

    const styles = this.getStyles()

    return (
      <View style={styles.container}>
        <Text numberOfLines={lines} style={styles.text}>
          {text}
        </Text>
      </View>
    )
  }
}

Subheader.defaultProps = defaultProps
export default Subheader

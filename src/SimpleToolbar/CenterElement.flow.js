/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { ViewPropTypes } from '../utils/index'
import getTheme from '../styles/getTheme'

const defaultProps = {
  style: {}
}
type CenterElementProps = {
  style: {
    titleText?: Text.propTypes.style,
    centerElementContainer?: ViewPropTypes.style,
  },
  title?: string
}

class CenterElement extends PureComponent<CenterElementProps> {

  static defaultProps: typeof defaultProps
  props: CenterElementProps
  static defaultProps = defaultProps
  getStyles = () => {
    let props = this.props
    let {simpleToolbar} = getTheme()
    return {
      centerElementContainer: [
        simpleToolbar.centerElementContainer,
        props.style.centerElementContainer
      ],
      titleText: [
        simpleToolbar.titleText,
        props.style.titleText,
      ]
    }

  }

  render () {
    const styles = this.getStyles()
    return (
      <View style={styles.centerElementContainer}>
        <Text style={styles.titleText}>{this.props.title}</Text>
      </View>
    )
  }
}

export default CenterElement

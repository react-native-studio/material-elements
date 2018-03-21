/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { ViewPropTypes } from '../utils/index'
import getTheme from '../styles/getTheme'

type CenterElementStyle={
  titleText?: Text.propTypes.style,
  centerElementContainer?: ViewPropTypes.style,
}
type CenterElementPropTypes = {
  style:CenterElementStyle,
  title?: string
}

const defaultProps = {
  style: {}
}
class CenterElement extends PureComponent<CenterElementPropTypes> {

  props: CenterElementPropTypes
  static defaultProps: typeof defaultProps
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

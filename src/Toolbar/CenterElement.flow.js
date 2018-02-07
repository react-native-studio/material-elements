/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, TouchableWithoutFeedback, Text, TextInput, Easing, Platform } from 'react-native'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

type StyleType = {
  centerElementContainer?: ViewPropTypes.style,
  titleText?: Text.propTypes.style,
}
type CenterElementProps = {
  centerElement: string | React.Component<any>,
  onPress: () => void,
  style: StyleType,
  haveLeftElement?: boolean,
}
const defaultProps = {
  onPress: null,
  centerElement: null,
  style: {},
}

function getStyles (props: CenterElementProps) {
  const {toolbar} = getTheme()
  const {haveLeftElement} = props
  const local = {}

  if (!haveLeftElement) {
    local.centerElementContainer = {
      marginLeft: 16,
    }
  }

  return {
    centerElementContainer: [
      toolbar.centerElementContainer,
      local.centerElementContainer,
      props.style.centerElementContainer,
    ],
    titleText: [
      toolbar.titleText,
      props.style.titleText,
    ],
  }
}

class CenterElement extends PureComponent<CenterElementProps> {

  props: CenterElementProps
  static defaultProps: typeof defaultProps

  render () {
    const {centerElement, onPress} = this.props
    const styles = getStyles(this.props)

    let content = null

    if (typeof centerElement === 'string') {
      content = (
        <Text numberOfLines={1} style={styles.titleText}>
          {centerElement}
        </Text>
      )
    } else {
      content = centerElement
    }

    return (
      <TouchableWithoutFeedback key="center" onPress={onPress}>
        <View
          style={
            styles.centerElementContainer
          }
        >
          {content}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

CenterElement.defaultProps = defaultProps
export default CenterElement
/**
 * @flow
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, Platform, StyleSheet,View,Text, } from 'react-native'
import getTheme from '../styles/getTheme'
import IconToggle from '../IconToggle'
import type { IconPropTypes } from '../Icon/Icon.flow'
import { ViewPropTypes } from '../utils/index'

type StyleType = {
  leftElementContainer?: ViewPropTypes.style,
  leftElement?: Text.propTypes.style,
}
type props = {
  leftElement: IconPropTypes | React.Component<any>,
  style: StyleType,
  onLeftElementPress: () => void,
  leftElementContainerStyle?:ViewPropTypes.style,
  leftElementStyle?:ViewPropTypes.style,
}
const defaultProps = {
  leftElement: null,
  onLeftElementPress: null,
  style: {},
}

function getStyles (props: props) {
  const {toolbar} = getTheme()

  return {
    leftElementContainer: [
      toolbar.leftElementContainer,
      props.style.leftElementContainer,
      props.leftElementContainerStyle
    ],
    leftElement: [
      toolbar.leftElement,
      props.style.leftElement,
      props.leftElementStyle
    ],
  }
}

class LeftElement extends PureComponent<props> {

  props: props
  static defaultProps: typeof defaultProps

  render () {
    const styles = getStyles(this.props)
    const {
      onLeftElementPress,
      leftElement,
    } = this.props

    if (!leftElement) {
      return null
    }

    if (React.isValidElement(leftElement)) {
      return (
        <Animated.View style={styles.leftElementContainer}>
          {React.cloneElement((leftElement: any), {key: 'customLeftElement'})}
        </Animated.View>
      )
    }

    let onPress = onLeftElementPress
    const flattenLeftElement = StyleSheet.flatten(styles.leftElement)

    const {name, size, color, type} = (leftElement: any)
    const iconToggleProps = {
      name,
      size,
      color: color || flattenLeftElement.color,
      type,
    }
    return (
      <View
        style={styles.leftElementContainer}
      >
        <IconToggle
          key={name}
          {...iconToggleProps}
          onPress={onPress}
          style={flattenLeftElement}
        />
      </View>
    )
  }
}

LeftElement.defaultProps = defaultProps
export default LeftElement

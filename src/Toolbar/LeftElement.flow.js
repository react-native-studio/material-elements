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
  leftElement: IconPropTypes | React.Component<any> | ()=>?React.Component<*>,
  style: StyleType,
  onPress: () => void,
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
      onPress,
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
    /**
     * 在ES6中函数和类本质是一样的，而在react中，<Element/>这样
     * 的语法相当于new一个类或者调用一个函数
     *
     * 知识点增加：
     * javascript中基于原型链的继承
     * 1，每一个实例对象都有一个_proto_(非标准)属性，该属性指向该对象构造函数
     *    的原型对象,获取实例对象的原型，Object.getPrototypeOf(o:Object)
     *
     * 2，每个函数都有一个prototype属性，它是一个指向原型对象的指针
     */
    if(typeof leftElement === 'function'){
      return (
        <Animated.View style={styles.leftElementContainer}>
          {leftElement()}
        </Animated.View>
      );
    }

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

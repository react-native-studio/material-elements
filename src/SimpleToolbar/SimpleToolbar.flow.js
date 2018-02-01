/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'
import CenterElement from './CenterElement.flow'
import IconToggle from '../IconToggle'

type SimpleToolbarProps = {
  title?: string,
  leftIconName?: string,
  rightIconName?: string,
  onLeftIconPress?: () => void,
  onRightIconPress?: () => void,
  style: {
    container?: ViewPropTypes.style,
    leftElement?: ViewPropTypes.style,
    rightElement?: ViewPropTypes.style,
    centerElement?:ViewPropTypes.style,
    title?:Text.propTypes.style,
  }
}
const defaultProps = {
  style: {},
  leftIconName: 'arrow-back',
  rightIconName: null,
}

class SimpleToolbar extends PureComponent<SimpleToolbarProps> {
  props: SimpleToolbarProps
  static defaultProps: typeof defaultProps
  static defaultProps = defaultProps
  _onLeftIconPress = () => {
    let {onLeftIconPress} = this.props
    onLeftIconPress && onLeftIconPress()
  }
  _onRightIconPress = () => {
    let {onRightIconPress} = this.props
    onRightIconPress && onRightIconPress()
  }
  getStyles = () => {
    let props = this.props
    const {simpleToolbar} = getTheme()
    return {
      container: [
        simpleToolbar.container,
        props.style.container,
      ],
      leftElement: [
        simpleToolbar.leftElement,
        props.style.leftElement
      ],
      rightElement: [
        simpleToolbar.rightElement,
        props.style.rightElement
      ],
      centerElement:[props.style.centerElement],
      title:[props.style.title]
    }
  }

  render () {
    const styles = this.getStyles()
    let {leftIconName, rightIconName} = this.props
    const flattenLeftElement = StyleSheet.flatten(styles.leftElement)
    const flattenRightElement = StyleSheet.flatten(styles.rightElement)
    return (
      <View style={styles.container}>
        {/*CenterElement元素放在中间，则会使得左侧的Icon无法使用onPress*/}
        {/*在ReactNative 中，当view设置了position属性后，图层变低，但是比其前面的图层高。子view的图层高于父view的图层*/}
        <CenterElement
          style={{
            centerElementContainer:styles.centerElement,
            titleText:styles.title,
          }}
          title={this.props.title}
        />
        <IconToggle
          key={leftIconName}
          name={leftIconName}
          color={flattenLeftElement.color}
          onPress={this._onLeftIconPress}
          style={flattenLeftElement}
        />
        {rightIconName && <IconToggle
          key={rightIconName}
          name={rightIconName}
          color={flattenRightElement.color}
          onPress={this._onRightIconPress}
          style={flattenRightElement}
        />}
      </View>
    )
  }
}

export default SimpleToolbar

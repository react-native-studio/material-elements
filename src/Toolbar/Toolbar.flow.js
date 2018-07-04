/**
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ViewPropTypes } from '../utils'
import LeftElement from './LeftElement.flow'
import CenterElement from './CenterElement.flow'
import RightElement from './RightElement.flow'
import IconToggle from '../IconToggle'
import getTheme from '../styles/getTheme'
import type { IconPropTypes } from '../Icon/Icon.flow'

type StyleType = {
  container?: ViewPropTypes.style,
  leftElementContainer?: ViewPropTypes.style,
  leftElement?: IconToggle.propTypes.style,
  centerElementContainer?: ViewPropTypes.style,
  titleText?: Text.propTypes.style,
  rightElementContainer?: ViewPropTypes.style,
  rightElement?: IconToggle.propTypes.style,
}
type MenuType = {
  menu: { labels: Array<string> | Array<{ text: string, icon: IconPropTypes }> }
};
type Actions = {
  actions: Array<IconPropTypes>
}
type ToolbarProps = {
  onLeftElementPress?: (any) => void,
  style: StyleType | typeof defaultProps.style,
  onPress?: () => void,
  leftElement: IconPropTypes | React.Component<any> | ()=>React.Component<any>,
  onLeftElementPress?: () => void,
  centerElement: React.Component<any> | string | ()=>React.Component<any>,
  rightElement: IconPropTypes | React.Component<any> | Actions | MenuType | ()=>React.Component<any>,
  onRightElementPress?: (any) => void,
  containerStyle?:ViewPropTypes.style,
  leftElementContainerStyle?:ViewPropTypes.style,
  leftElementStyle?:ViewPropTypes.style,
  rightElementContainerStyle?:ViewPropTypes.style,
  rightElementStyle?:ViewPropTypes.style,
  centerElementContainerStyle?:ViewPropTypes.style,
  titleStyle?:ViewPropTypes.style,

}
const defaultProps = {
  style: {},
  onRightElementPress: null,
  rightElement: null,
  onPress: null,
  centerElement: null,
  leftElement: null,
  onLeftElementPress: null,
}
function getStyles (props: ToolbarProps) {
  const {toolbar} = getTheme()

  return {
    container: [
      toolbar.container,
      props.style.container,
      props.containerStyle
    ],
  }
}

class Toolbar extends PureComponent<ToolbarProps> {

  props: ToolbarProps
  static defaultProps:typeof defaultProps
  render () {
    const {
      onLeftElementPress,
      onPress,
      onRightElementPress,
    } = this.props

    const styles = getStyles(this.props)

    return (
      <Animated.View
        style={styles.container}
      >
        <LeftElement
          {...this.props}
          onPress={onLeftElementPress}
        />
        <CenterElement
          {...this.props}
          onPress={onPress}
        />
        <RightElement
          {...this.props}
          onPress={onRightElementPress}
        />
      </Animated.View>
    )
  }
}

Toolbar.defaultProps = defaultProps
export default Toolbar

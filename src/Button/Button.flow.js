/**
 * @providersModule Button
 * @flow
 */
import React, { PureComponent } from 'react'
import { StyleSheet,View, Text } from 'react-native'
import getTheme from '../styles/getTheme'
import light from '../styles/themes/light'
//$FlowFixMe,使用它可解决后缀名android/ios引入的错误
import getPlatformElevation from '../styles/getPlatformElevation'
import RippleFeedback from '../RippleFeedback'
import Icon from '../Icon/Icon.flow'
import { ViewPropTypes } from '../utils/index'
import Color from 'color'
import type {IconPropTypes} from "../Icon/Icon.flow";

export type ButtonPropTypes={
  /**
   * button组件是否可用
   */
  disabled?: boolean,
  /**
   * button组件是否凸起
   */
  raised?:boolean,
  /**
   * 按下时触发，传递text参数
   */
  onPress?:(text:string)=>void,
  /**
   * 长按触发，传递text参数
   */
  onLongPress?:(text:string)=>void,
  /**
   * text将被显示
   */
  text: string,
  /**
   * 是否转换大写
   */
  upperCase?: boolean,
  /**
   * 展示图标，展示在text之前
   */
  icon?: IconPropTypes,
  /**
   * 重写button样式和text样式
   */
  style:ButtonStyle,
  /**
   * button强调色
   */
  accent?:boolean,
  /**
   * button主题色
   */
  primary?:boolean,
  /**
   * icon位置
   */
  iconPosition?:'left' | 'right',
  /**
   * 是否使用文字颜色用于水波纹颜色
   */
  useTextColorForRippleColor:boolean,//是否使用文字颜色用于水波纹颜色，仅仅flatbutton有效
}

const defaultProps = {
  icon: null,
  onPress: null,
  onLongPress: null,
  primary: false,
  accent: false,
  disabled: false,
  raised: false,
  upperCase: true,
  style: {
  },
  iconPosition: 'left'
}
type ButtonState = {
  elevation: number,
}
/**
 * button style
 */
type ButtonStyle = {
  container?: ViewPropTypes.style,
  icon?: Icon.propTypes.style,
  text?: Text.propTypes.style,
}

function getStyles (props, state) {
  let uiTheme = getTheme()
  const {
    button,
    buttonFlat,
    buttonRaised,
    buttonDisabled,
    buttonRaisedDisabled,
  } = uiTheme

  const {primary, accent, disabled, raised,iconPosition} = props
  const {palette} = light

  type containerType = {
    backgroundColor?: ?string,
  }
  type localType = {
    container: containerType,
    icon?: mixed,
    text?: mixed,
  }
  let local: localType = {
    container: {}
  }

  if (!disabled) {
    if (primary && !raised) {
      local.text = {color: palette.primaryColor}
    } else if (accent && !raised) {
      local.text = {color: palette.accentColor}
    }

    if (primary && raised) {
      local.container.backgroundColor = palette.primaryColor
      local.text = {color: palette.canvasColor}
    } else if (accent && raised) {
      local.container.backgroundColor = palette.accentColor
      local.text = {color: palette.canvasColor}
    }
  }

  if (raised && !disabled) {
    local.container = {
      ...local.container,
      ...getPlatformElevation(state.elevation),
    }
  }

  return {
    container: [
      button.container,
      !raised && buttonFlat.container,
      raised && buttonRaised.container,
      (!raised && disabled) && buttonDisabled.container,
      (raised && disabled) && buttonRaisedDisabled.container,
      local.container,
      props.style.container,
    ],
    text: [
      button.text,
      !raised && buttonFlat.text,
      raised && buttonRaised.text,
      (!raised && disabled) && buttonDisabled.text,
      (raised && disabled) && buttonRaisedDisabled.text,
      local.text,
      props.style.text,
    ],
    icon: [
      button.icon,
      !raised && buttonFlat.icon,
      disabled && buttonDisabled.icon,
      raised && buttonRaised.icon,
      local.icon,
      props.style.icon,
      iconPosition==='left'?{marginLeft:0}:{marginRight:0},
    ],
  }
}

class Button extends PureComponent<ButtonPropTypes, ButtonState> {
  props: ButtonPropTypes
  state: ButtonState = {
    elevation: 2
  }
  static defaultProps: typeof defaultProps

  onPress = () => {
    const {text, onPress} = this.props

    if (onPress) {
      onPress(text)
    }
  }
  setElevation = () => {
    this.setState({
      elevation: 4,
    })
  }

  removeElevation = () => {
    this.setState({
      elevation: 2,
    })
  }

  renderIcon = (styles: ButtonStyle) => {
    const {icon} = this.props
    const textFlatten = StyleSheet.flatten(styles.text)

    if (!icon) {
      return null
    }

    const {name, size, color, type} = icon

    const iconColor = color || textFlatten.color

    const iconSize = size || 24

    return (
      <Icon name={name} size={iconSize} type={type} color={iconColor} style={styles.icon}/>
    )
  }

  render () {
    const {text, disabled, raised, upperCase, onLongPress, iconPosition,useTextColorForRippleColor} = this.props

    const styles = getStyles(this.props, this.state)

    const content = (
      <View style={styles.container} pointerEvents="box-only">
        {iconPosition === 'left' && this.renderIcon(styles)}
        <Text style={styles.text}>
          {upperCase ? text.toUpperCase() : text}
        </Text>
        {iconPosition === 'right' && this.renderIcon(styles)}
      </View>
    )

    if (disabled) {
      return content
    }

    return (
      <RippleFeedback
        onPress={!disabled ? this.onPress : null}
        onLongPress={!disabled ? onLongPress : null}
        onPressIn={raised ? this.setElevation : null}
        onPressOut={raised ? this.removeElevation : null}
        delayPressIn={50}
        color={useTextColorForRippleColor&& !raised ? Color(StyleSheet.flatten(styles.text).color).alpha(0.12).toString():null}
        borderless={useTextColorForRippleColor&&!raised ? false:true}
        underlayColor={useTextColorForRippleColor&&!raised ? Color(StyleSheet.flatten(styles.text).color).alpha(0.12).toString():'rgb(224,224,224)'}

      >
        {content}
      </RippleFeedback>
    )
  }
}
Button.defaultProps=defaultProps
export default Button

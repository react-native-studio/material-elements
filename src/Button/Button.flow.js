/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { StyleSheet,View, Text } from 'react-native'
import type { ButtonPropTypes } from '../TypeDifinition'
import getTheme from '../styles/getTheme'
import light from '../styles/themes/light'
//$FlowFixMe,使用它可解决后缀名android/ios引入的错误
import getPlatformElevation from '../styles/getPlatformElevation'
import RippleFeedback from '../RippleFeedback'
import Icon from '../Icon/Icon.flow'
import { ViewPropTypes } from '../utils/index'

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
    container: {},
    icon: {},
    text: {},
  },
  iconPosition: 'left'
}
type ButtonState = {
  elevation: number,
}
type StylesType = {
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
  static defaultProps: typeof defaultProps = defaultProps

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

  renderIcon = (styles: StylesType) => {
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
    const {text, disabled, raised, upperCase, onLongPress, iconPosition} = this.props

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
      >
        {content}
      </RippleFeedback>
    )
  }
}

export default Button

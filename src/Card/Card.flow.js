/**
 * @providersModule Card
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ViewPropTypes } from '../utils/index'
import getTheme from '../styles/getTheme'
import RippleFeedback from '../RippleFeedback'
type CardStyle={
  container?:ViewPropTypes.style,
}
type CardPropTypes = {
  children: mixed,

  onPress?: () => void,

  style?:CardStyle,
  /**
   * 是否水平铺满
   */
  fullWidth?: boolean,
  containerStyle?:ViewPropTypes.style,
}

function getStyles (props) {
  const {card} = getTheme(),local={};
  if (props.fullWidth) {
    local.container = {
      marginHorizontal: 0,
    }
  }
  return {
    container: [
      card.container,
      local.container,
      props.style?props.style.container:{},
      props.containerStyle,
    ],
  }
}
const defaultProps={
  style:{}
}
class Card extends Component<CardPropTypes> {
  props: CardPropTypes

  static defaultProps:typeof defaultProps=defaultProps

  render () {
    const {onPress, children} = this.props

    const styles = getStyles(this.props)

    const content = (
      <View style={styles.container}>
        {children}
      </View>
    )

    if (onPress) {
      return (
        <RippleFeedback onPress={onPress} pointerEvents="box-only">
          {content}
        </RippleFeedback>
      )
    }

    return content
  }
}
export default Card;

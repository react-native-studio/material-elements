/**
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text ,Dimensions} from 'react-native'
import type { IconPropTypes } from '../TypeDifinition'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'
import Icon from '../Icon/Icon.flow'
import RippleFeedBack from '../RippleFeedback'

const {width}=Dimensions.get('window')

type StyleType = {
  container?: ViewPropTypes.style,
  text?: Text.propTypes.style,
}
type BSGridItemProps = {

  icon?: IconPropTypes,

  text: string,

  itemIndex: number,

  isHaveTitle: boolean,

  style: StyleType,

  onPress?:()=>void
}

const defaultProps = {
  style: {}
}

class BSGridItem extends Component<BSGridItemProps> {

  props: BSGridItemProps
  static defaultProps: typeof defaultProps
  static defaultProps = defaultProps
  getStyles = () => {

    const {bottomSheetGridItem, bottomSheet} = getTheme()

    const {props} = this

    return {
      container: [
        bottomSheetGridItem.container,
        props.style.container,
      ],
      text: [
        bottomSheetGridItem.text,
        props.style.text,
      ],
      gridContent: [bottomSheet.gridContent]
    }
  }
  renderIcon = (styles: StyleType) => {

    const {icon} = this.props

    if (!icon) {
      return null
    }

    const {name, color, size, type} = icon

    const iconSize = size || 48

    const iconProps = {
      name,
      color,
      type,
      size: iconSize,
    }

    return <Icon {...iconProps}/>

  }

  render () {

    const styles = this.getStyles()

    const {text, onPress, itemIndex, isHaveTitle} = this.props

    const marginSize = (width - StyleSheet.flatten(styles.gridContent).paddingHorizontal * 2 - StyleSheet.flatten(styles.container).width * 3) / 2
    const attachStyle = (itemIndex + 1) % 3 === 0 ? {marginHorizontal: marginSize} : {}
    const attachStyle2 = isHaveTitle && itemIndex <= 3 ? {marginTop: 0} : {}
    return (
      <RippleFeedBack onPress={onPress}>
        <View style={[styles.container, attachStyle, attachStyle2]}>
          {this.renderIcon(styles)}
          <Text style={styles.text}>{text}</Text>
        </View>
      </RippleFeedBack>
    )
  }
}

export default BSGridItem

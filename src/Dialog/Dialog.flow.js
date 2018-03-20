/**
 * @providersModule Dialog
 * @flow
 */
import { View } from 'react-native'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback'

import Title from './Title.flow'
import Content from './Content.flow'
import Actions from './Actions.flow'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

type DialogPropTypes = {
  children: any,
  onPress: () => void,
  style: {
    container?: ViewPropTypes
  }
}
const defaultProps = {
  onPress: null,
  style: {},
}

class Dialog extends PureComponent<DialogPropTypes> {

  props:DialogPropTypes
  static Actions:typeof Actions
  static Content:typeof Content
  static Title:typeof Title
  static defaultProps:typeof defaultProps
  getStyles = () => {
    let props = this.props
    const {dialog} = getTheme()

    return {
      container: [
        dialog.container,
        props.style.container,
      ],
    }
  }

  render () {
    const {onPress, children} = this.props

    const styles = this.getStyles()

    return (
      <RippleFeedback onPress={onPress}>
        <View style={styles.container}>
          {children}
        </View>
      </RippleFeedback>
    )
  }
}

Dialog.defaultProps = defaultProps

Dialog.Title = Title
Dialog.Content = Content
Dialog.Actions = Actions

export default Dialog

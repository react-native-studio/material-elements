/**
 * @flow
 */
import { View } from 'react-native'
import React, { PureComponent } from 'react'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

type props = {
  children: any,
  style: {
    contentContainer?: ViewPropTypes.style,
  }
}
const defaultProps = {
  style: {},
}

class DialogContent extends PureComponent<props> {

  props: props
  static defaultProps:typeof defaultProps=defaultProps
  getStyles = () => {
    let props = this.props
    const {dialog} = getTheme()

    return {
      contentContainer: [
        dialog.contentContainer,
        props.style.contentContainer,
      ],
    }
  }

  render () {
    const {children} = this.props

    const styles = this.getStyles()

    return (
      <View style={styles.contentContainer}>
        {children}
      </View>
    )
  }
}

export default DialogContent

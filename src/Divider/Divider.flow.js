/**
 * @flow
 */
import React from 'react'
import { View } from 'react-native'
import type { DividerProps } from '../TypeDifinition'
import getTheme from '../styles/getTheme'

const defaultProps = {
  inset: false,
  style: {},
}

class Divider extends React.PureComponent<DividerProps> {
  props: DividerProps
  static defaultProps: typeof defaultProps = defaultProps

  getStyles = () => {
    let props = this.props
    const {divider} = getTheme()

    const local = {
      container: props.inset ? {marginLeft: 72} : null,
    }

    return {
      container: [
        divider.container,
        local.container,
        props.style.container,
      ],
    }

  }

  render () {
    const styles = this.getStyles()

    return (
      <View style={styles.container}/>
    )
  }
}

export default Divider

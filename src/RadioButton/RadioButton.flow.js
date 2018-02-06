/**
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Checkbox from '../Checkbox'

type RadioProps = {
  checked: boolean,
  disabled?: boolean,
  onSelect: (value: boolean) => void,
}
class RadioButton extends React.PureComponent<RadioProps> {
  props: RadioProps

  onPress = () => {
    const {checked, disabled, onSelect} = this.props

    if (disabled && !checked) {
      return
    }

    onSelect(!checked)
  }

  render () {
    return (
      <Checkbox
        checkedIcon={{name: 'radio-button-checked'}}//"radio-button-checked"
        uncheckedIcon={{name: 'radio-button-unchecked'}}
        onCheck={this.onPress}
        {...this.props}
      />
    )
  }
}

export default RadioButton

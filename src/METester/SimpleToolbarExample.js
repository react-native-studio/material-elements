import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import SimpleToolbar from '../SimpleToolbar/SimpleToolbar.flow'

export default class SimpleToolbarExample extends Component {
  render () {
    return (
      <View>
        <SimpleToolbar rightIcon={{name:'more'}} leftIcon={{name:'menu'}} title="菜单"/>
      </View>
    )
  }
}

/**
 * @flow
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
type MenuDividerProps={
  color?:string
}
class MenuDivider extends React.Component<MenuDividerProps>{
  static defaultProps:MenuDividerProps
  props:MenuDividerProps
  render(){
    let {color} = this.props;
    return (
      <View style={[styles.divider, { borderBottomColor: color }]} />
    )
  }
}
MenuDivider.defaultProps = {
  color: 'rgba(0,0,0,0.12)',
};
const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: 1,
  },
});

export default MenuDivider;

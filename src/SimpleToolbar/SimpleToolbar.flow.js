/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'
import CenterElement from './CenterElement.flow'
import IconToggle from '../IconToggle'
import type {IconPropTypes} from "../Icon/Icon.flow";
type SimpleToolbarStyle={
  container?: ViewPropTypes.style,
  leftElement?: ViewPropTypes.style,
  rightElement?: ViewPropTypes.style,
  centerElement?:ViewPropTypes.style,
  title?:Text.propTypes.style,
}
type SimpleToolbarPropTypes = {
  title: string,
  leftIcon?: IconPropTypes,
  rightIcon?: IconPropTypes,
  onLeftIconPress?: () => void,
  onRightIconPress?: () => void,
  style: SimpleToolbarStyle | typeof defaultProps.style,
  material?:boolean
}
const defaultProps = {
  style: {},
  leftIconName: 'arrow-back',
  material:true //默认以material样式显示
}

class SimpleToolbar extends PureComponent<SimpleToolbarPropTypes> {
  props: SimpleToolbarPropTypes
  static defaultProps: typeof defaultProps
  static defaultProps = defaultProps
  _onLeftIconPress = () => {
    let {onLeftIconPress} = this.props
    onLeftIconPress && onLeftIconPress()
  }
  _onRightIconPress = () => {
    let {onRightIconPress} = this.props
    onRightIconPress && onRightIconPress()
  }
  getStyles = () => {
    let props = this.props
    const {simpleToolbar} = getTheme()
    return {
      container: [
        simpleToolbar.container,
        props.style.container,
      ],
      leftElement: [
        simpleToolbar.leftElement,
        props.style.leftElement
      ],
      rightElement: [
        simpleToolbar.rightElement,
        props.style.rightElement
      ],
      centerElement:[props.style.centerElement],
      title:[props.style.title]
    }
  }
  renderLeftIcon=(styles:SimpleToolbarStyle)=>{

    const {leftIcon}=this.props;

    const flattenLeftElement = StyleSheet.flatten(styles.leftElement)

    if(leftIcon){
      const {name,size,color,type}=leftIcon;
      const iconToggleProps={
        name,
        size,
        color:color || flattenLeftElement.color,
        type,
      }
      return <IconToggle
        key={name}
        {...iconToggleProps}
        onPress={this._onLeftIconPress}
        style={flattenLeftElement}
      />
    }
  }

  renderRightIcon=(styles:SimpleToolbarStyle)=>{

    const {rightIcon}=this.props;

    const flattenRightElement = StyleSheet.flatten(styles.rightElement)

    if(rightIcon){
      const {name,size,color,type}=rightIcon;
      const iconToggleProps={
        name,
        size,
        color:color || flattenRightElement.color,
        type,
      }
      return <IconToggle
        key={name}
        {...iconToggleProps}
        onPress={this._onRightIconPress}
        style={flattenRightElement}
      />
    }
    return null;
  }
  render () {
    const styles = this.getStyles();
    const {material}=this.props;
    return (
      <View style={styles.container}>
        {/*CenterElement元素放在中间，则会使得左侧的Icon无法使用onPress*/}
        {/*在ReactNative 中，当view设置了position属性后，图层变低，但是比其前面的图层高。子view的图层高于父view的图层*/}
        {material&&this.renderLeftIcon(styles)}
        <CenterElement
          material={material}
          style={{
            centerElementContainer:styles.centerElement,
            titleText:styles.title,
          }}
          title={this.props.title}
        />
        {!material&&this.renderLeftIcon(styles)}
        {this.renderRightIcon(styles)}
      </View>
    )
  }
}

export default SimpleToolbar

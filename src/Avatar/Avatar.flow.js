/**
 * @providesModule Avatar
 * @flow
 */
import React,{PureComponent} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import getTheme from '../styles/getTheme';
import Icon from '../Icon/Icon.flow';
import type {IconPropTypes} from "../Icon/Icon.flow";
import {ViewPropTypes} from '../utils';
export type AvatarProps={
  /**
   * 传入Image组件属性，avatar渲染Image
   */
  image?:{
    ...Image.propTypes
  },
  /**
   * 传入Icon属性，avatar渲染icon
   */
  icon?:IconPropTypes,
  /**
   * 传入text
   */
  text?:string,
  /**
   * 仅仅用于container尺寸: style: { width: size, height: size, borderRadius: size / 2 }
   */
  size?:number,
  /**
   * avatar样式
   */
  style?:AvatarStyle,
  /**
   * avatar container style
   */
  containerStyle?:ViewPropTypes.style,
  /**
   * avatar内容style，如果为icon则为icon style,
   * 如果为text，则为text style
   */
  contentStyle?:ViewPropTypes.style,
  /**
   * 图片资源
   */
  source?:string | number,
}
type AvatarStyle={
  container?:ViewPropTypes.style,
  content?:ViewPropTypes.style,
}
const defaultProps = {
  image: null,
  icon: null,
  text: null,
  size: 48,
  style: {},
};

function getStyles(props) {
  const { avatar } = getTheme();
  const {
    size,
    style,
    containerStyle,
    contentStyle,
  } = props;
  const local = {};
  if (size) {
    local.container = {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
  }
  return {
    container: [
      avatar.container,
      local.container,
      style?style.container:{},
      containerStyle,
    ],
    content: [
      avatar.content,
      local.content,
      style?style.content:{},
      contentStyle
    ],
    image:[
      avatar.container,
      local.container,
      style?style.container:{},
      containerStyle,
    ]
  };
}
class Avatar extends PureComponent<AvatarProps>{
  props:AvatarProps
  static defaultProps:typeof defaultProps
  static defaultProps=defaultProps

  renderContent=()=>{
    let {image,icon,text,source}=this.props;
    let {avatar,spacing} =getTheme();
    const styles=getStyles(this.props);
    //如果icon属性不为空
    if(icon){
      const color=icon.color || StyleSheet.flatten(avatar.content).color;
      const size=icon.size || spacing.iconSize;
      const iconProps={
        name:icon.name,
        type:icon.type,
        size,
        color,
      }
      return <Icon {...iconProps}/>
    }
    //text属性不为空
    if(text){
      return <Text style={styles.content}>{text}</Text>
    }
    //image属行不为空
    if(image){
      let {source:_source,...otherProps} = image
      let nativeSource = source || _source;
      return <Image {...otherProps} source={nativeSource} style={styles.image}/>
    }
    if(source){
      return <Image source={source} style={styles.image}/>
    }
  }
  render() {
    const styles=getStyles(this.props);
    return (
      <View style={[styles.container,{overflow: 'hidden'}]} >
        {this.renderContent()}
      </View>
    );
  }
}
export default Avatar;

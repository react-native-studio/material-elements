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
export type AvatarPropTypes={
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
  const { size ,style} = props;
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
    ],
    content: [
      avatar.content,
      local.content,
      style?style.content:{},
    ],
    image:[
      avatar.container,
      local.container,
      style?style.container:{},
    ]
  };
}
class Avatar extends PureComponent<AvatarPropTypes>{
  props:AvatarPropTypes
  static defaultProps:typeof defaultProps
  static defaultProps=defaultProps

  renderContent=()=>{
    let {image,icon,text}=this.props;
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
      return <Image {...image} style={styles.image}/>
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

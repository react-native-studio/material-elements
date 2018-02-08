/**
 * @flow
 */
import React from 'react';
import {Text,Image} from 'react-native';
import { ViewPropTypes } from '../utils/index'
export type IconPropTypes={
  name?:?string,
  size?:?number,
  color?:?string,
  type?:?string,
  style?:?mixed,
}
export type ButtonPropTypes={
  /**
   * button组件是否可用
   */
  disabled?: boolean,
  /**
   * button组件是否凸起
   */
  raised?:boolean,
  /**
   * 按下时触发，传递text参数
   */
  onPress?:(text:string)=>void,
  /**
   * 长按触发，传递text参数
   */
  onLongPress?:(text:string)=>void,
  /**
   * text将被显示
   */
  text: string,
  /**
   * 是否转换大写
   */
  upperCase?: boolean,
  /**
   * 展示图标，展示在text之前
   */
  icon?: IconPropTypes,
  /**
   * 重写button样式和text样式
   */
  style: {
    container:mixed,
    text:mixed,
    icon:mixed,
  },
  accent?:boolean,
  primary?:boolean,
  iconPosition?:'left' | 'right',
}
type actions={
  icon?:?IconPropTypes,
  label?:string,
  name?:string,
}
export type ActionButtonProps={
  actions?: actions,
  onPress?:()=>void,
  onLongPress?:()=>void,
  hidden?:boolean,
  icon?:IconPropTypes,
  transition: 'toolbar'|'speedDial',
  rippleColor?: string,
  style:{
    container:mixed,
    icon:mixed
  },
}

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
  text?:string,
  /**
   * 仅仅用于container尺寸: style: { width: size, height: size, borderRadius: size / 2 }
   */
  size?:number,
  /**
   * avatar样式
   */
  style:{
    container?:ViewPropTypes.style,
    text?:Text.propTypes.style,
    content?:ViewPropTypes.style,
  },
}
export type DividerProps={
  inset?: boolean,
  style: {
    container?:ViewPropTypes.style
  },
}

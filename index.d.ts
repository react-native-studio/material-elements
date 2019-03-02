import React from "react"
import { ImageProps, Text, TextStyle, ViewStyle } from "react-native";
export interface DividerProps{
  inset?: boolean,
  style?: {
    container?: ViewStyle
  },
}
export class Divider extends React.Component<DividerProps>{}

type ListItemStyle={
  container?:ViewStyle,
  content?:ViewStyle,
  contentViewContainer?:ViewStyle,
  leftElementContainer?:ViewStyle,
  centerElementContainer?:ViewStyle,
  textViewContainer?:ViewStyle,
  primaryText?:TextStyle,
  firstLine?:TextStyle,
  primaryTextContainer?:ViewStyle,
  secondaryText?:TextStyle,
  tertiaryText?:TextStyle,
  rightElementContainer?:ViewStyle,
  leftElement?:TextStyle,
  rightElement?:TextStyle
}
export interface IconProps{
  name?:string,
  size?:number,
  color?:string,
  type?: 'MaterialIcons'|'FontAwesome'| 'Ionicons'| 'MaterialCommunityIcons',
  style?:TextStyle,
}
type MenuType={
  menu:{
    labels:Array<string>
  }
};
type Actions={
  actions:Array<IconProps>
}
export interface  ListItemProps{
  dense?:boolean,
  divider?:boolean,
  onPress?:(value:any)=>void,
  onLongPress?:(value:any)=>void,
  numberOfLines?:1 | 2 |3 | 'dynamic',
  style?:ListItemStyle,
  leftElement?: IconProps,
  rightElement?:IconProps | React.Component<any> |MenuType|Actions|Array<IconProps>,
  centerElement?: string| React.Component<any>|{primaryText:string, secondaryText:string,tertiaryText:string},
  children?:any,
  onLeftElementPress?:(value?:any)=>void,
  onRightElementPress?:(value?:any)=>void,
  onPressValue?:any,
}

export class ListItem extends React.Component<ListItemProps>{}
export class Icon extends React.Component<IconProps>{}

type ButtonStyle = {
  container?: ViewStyle,
  icon?: TextStyle,
  text?: TextStyle,
}

export interface ButtonProps{
  disabled?: boolean,
  raised?:boolean,
  onPress?:(text:string)=>void,
  onLongPress?:(text:string)=>void,
  text: string,
  upperCase?: boolean,
  icon?: IconProps,
  style?:ButtonStyle,
  accent?:boolean,
  primary?:boolean,
  iconPosition?:'left' | 'right',
  useTextColorForRippleColor?:boolean,//是否使用文字颜色用于水波纹颜色，仅仅flatbutton有效
  containerStyle?:ViewStyle,
  textStyle?:TextStyle,
  iconStyle?: TextStyle,
}
export class Button extends React.Component<ButtonProps>{}

export interface  TypographyProps{
  variant?: string ,
  style?:{
    text?:TextStyle,
  },
  children?:string | Text,
  textStyle?: TextStyle
}

export class Typography extends React.Component<TypographyProps>{}

type ActionsType=Array<{
  icon:IconProps,
  label:string,
  name:string,
}>
type ActionButtonStyle={
  positionContainer?:ViewStyle,
  toolbarPositionContainer?:ViewStyle,
  container?:ViewStyle,
  overlayContainer?:ViewStyle,
  toolbarContainer?:ViewStyle,
  toolbarActionContainer?:ViewStyle,
  speedDialContainer?:ViewStyle,
  speedDialActionContainer?:ViewStyle,
  speedDialActionLabel?:ViewStyle,
  speedDialActionLabelContainer?:ViewStyle,
  speedDialActionIconContainer?:ViewStyle,
  speedDialActionIcon?:ViewStyle,
  icon?:ViewStyle
}
type ActionButtonProps={
  actions?:ActionsType,
  onPress?:(text:any)=>void,
  onLongPress?:(text:any)=>void,
  hidden?:boolean,
  icon?:IconProps,
  transition?:'toolbar'| 'speedDial',
  rippleColor?:string,
  style?:ActionButtonStyle,
  size?:number,
}

export class ActionButton extends React.Component<ActionButtonProps>{}


export interface AvatarProps{
  image?:ImageProps,
  icon?:IconProps,
  text?:string,
  size?:number,
  style?:AvatarStyle,
  containerStyle?:ViewStyle,
  contentStyle?:ViewStyle,
  source?:string | number,
}
type AvatarStyle={
  container?:ViewStyle,
  content?:ViewStyle,
}

export class Avatar extends React.Component<AvatarProps>{}


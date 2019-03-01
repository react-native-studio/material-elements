import React from "react"
import { TextStyle, ViewStyle } from "react-native";
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

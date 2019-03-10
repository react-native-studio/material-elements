import React from "react"
import {ImageProps, Text, TextStyle, ViewStyle,ImageSourceProps} from "react-native";

export interface DividerProps {
    inset?: boolean,
    style?: {
        container?: ViewStyle
    },
}

export class Divider extends React.Component<DividerProps> {
}

type ListItemStyle = {
    container?: ViewStyle,
    content?: ViewStyle,
    contentViewContainer?: ViewStyle,
    leftElementContainer?: ViewStyle,
    centerElementContainer?: ViewStyle,
    textViewContainer?: ViewStyle,
    primaryText?: TextStyle,
    firstLine?: TextStyle,
    primaryTextContainer?: ViewStyle,
    secondaryText?: TextStyle,
    tertiaryText?: TextStyle,
    rightElementContainer?: ViewStyle,
    leftElement?: TextStyle,
    rightElement?: TextStyle
}

export interface IconProps {
    name?: string,
    size?: number,
    color?: string,
    type?: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'MaterialCommunityIcons',
    style?: TextStyle,
}

type MenuType = {
    menu: {
        labels: Array<string>
    }
};
type Actions = {
    actions: Array<IconProps>
}

export interface ListItemProps {
    dense?: boolean,
    divider?: boolean,
    onPress?: (value: any) => void,
    onLongPress?: (value: any) => void,
    numberOfLines?: 1 | 2 | 3 | 'dynamic',
    style?: ListItemStyle,
    leftElement?: IconProps | React.Component,
    rightElement?: IconProps | React.Component<any> | MenuType | Actions | Array<IconProps>,
    centerElement?: string | React.Component<any> | { primaryText: string, secondaryText: string, tertiaryText: string },
    children?: any,
    onLeftElementPress?: (value?: any) => void,
    onRightElementPress?: (value?: any) => void,
    onPressValue?: any,
}

export class ListItem extends React.Component<ListItemProps> {
}

export class Icon extends React.Component<IconProps> {
}

type ButtonStyle = {
    container?: ViewStyle,
    icon?: TextStyle,
    text?: TextStyle,
}

export interface ButtonProps {
    disabled?: boolean,
    raised?: boolean,
    onPress?: (text: string) => void,
    onLongPress?: (text: string) => void,
    text: string,
    upperCase?: boolean,
    icon?: IconProps,
    style?: ButtonStyle,
    accent?: boolean,
    primary?: boolean,
    iconPosition?: 'left' | 'right',
    useTextColorForRippleColor?: boolean,//是否使用文字颜色用于水波纹颜色，仅仅flatbutton有效
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
    iconStyle?: TextStyle,
}

export class Button extends React.Component<ButtonProps> {
}

export interface TypographyProps {
    variant?: string,
    style?: {
        text?: TextStyle,
    },
    children?: string | Text,
    textStyle?: TextStyle
}

export class Typography extends React.Component<TypographyProps> {
}

type ActionsType = Array<{
    icon: IconProps,
    label: string,
    name: string,
}>
type ActionButtonStyle = {
    positionContainer?: ViewStyle,
    toolbarPositionContainer?: ViewStyle,
    container?: ViewStyle,
    overlayContainer?: ViewStyle,
    toolbarContainer?: ViewStyle,
    toolbarActionContainer?: ViewStyle,
    speedDialContainer?: ViewStyle,
    speedDialActionContainer?: ViewStyle,
    speedDialActionLabel?: ViewStyle,
    speedDialActionLabelContainer?: ViewStyle,
    speedDialActionIconContainer?: ViewStyle,
    speedDialActionIcon?: ViewStyle,
    icon?: ViewStyle
}
type ActionButtonProps = {
    actions?: ActionsType,
    onPress?: (text: any) => void,
    onLongPress?: (text: any) => void,
    hidden?: boolean,
    icon?: IconProps,
    transition?: 'toolbar' | 'speedDial',
    rippleColor?: string,
    style?: ActionButtonStyle,
    size?: number,
}

export class ActionButton extends React.Component<ActionButtonProps> {
}


export interface AvatarProps {
    image?: ImageProps,
    icon?: IconProps,
    text?: string,
    size?: number,
    style?: AvatarStyle,
    containerStyle?: ViewStyle,
    contentStyle?: ViewStyle,
    source?: ImageSourceProps,
}

type AvatarStyle = {
    container?: ViewStyle,
    content?: ViewStyle,
}

export class Avatar extends React.Component<AvatarProps> {
}

type SimpleToolbarStyle = {
    container?: ViewStyle,
    leftElement?: ViewStyle,
    rightElement?: ViewStyle,
    centerElement?: ViewStyle,
    title?: TextStyle,
}
type SimpleToolbarProps = {
    title: string,
    leftIcon?: IconProps,
    rightIcon?: IconProps,
    onLeftIconPress?: () => void,
    onRightIconPress?: () => void,
    style?: SimpleToolbarStyle,
    center?: boolean,//title是否处于center
    containerStyle?: ViewStyle,
    leftElementStyle?: ViewStyle,
    rightElementStyle?: ViewStyle,
    titleStyle?: TextStyle,
    centerElementStyle?: ViewStyle,
}

export class SimpleToolbar extends React.Component<SimpleToolbarProps> {
}

type ToastStyle = {
    container?: ViewStyle,
    textContainer?: ViewStyle,
    text?: TextStyle,
}
type ToastProps = {
    style?: ToastStyle,
    containerStyle?: ViewStyle,
    textContainerStyle?: ViewStyle,
    textStyle?: TextStyle,
}

export class Toast extends React.Component<ToastProps> {
}

type IconToggleProps = {
    color?: string,
    underlayColor?: string,
    maxOpacity?: number,
    percent?: number,
    disabled?: boolean,
    size?: number,
    name?: string,
    children?: React.Node,
    onPress?: () => void,
    type?: "Ionicons" | "MaterialIcons" | "FontAwesome" | "MaterialCommunityIcons"
};

export class IconToggle extends React.Component<IconToggleProps> {
}

export var human
export var humanDense
export var humanTall
export var material
export var materialTall
export var materialDense
export var materialColors
export var iOSColors
export var iOSUIKit
export var iOSUIKitDense
export var iOSUIKitTall
export var sanFranciscoSpacing
export var sanFranciscoWeights
export var systemDenseWeights
export var systemTallWeights
export var systemWeights
export var robotoWeights
export var notoCJKWeights
export var notoTallWeights
export var webWeights

type CardStyle={
    container?: ViewStyle,
}
type CardProps = {
    children?: React.Node,
    onPress?: () => void,
    style?:CardStyle,
    fullWidth?: boolean,
    containerStyle?:ViewStyle,
}

export class Card extends React.Component<CardProps>{}

type ToolbarStyle = {
    container?: ViewStyle,
    leftElementContainer?: ViewStyle,
    leftElement?: ViewStyle,
    centerElementContainer?: ViewStyle,
    titleText?: TextStyle,
    rightElementContainer?:ViewStyle,
    rightElement?: ViewStyle,
}
type ToolbarMenuType = {
    menu: { labels: Array<string> | Array<{ text: string, icon: IconProps }> }
};

type ToolbarProps = {
    onLeftElementPress?: (any) => void,
    style?: ToolbarStyle,
    onPress?: () => void,
    leftElement?: ()=>React.Component<any> |IconProps | React.Component<any> ,
    centerElement?: ()=>React.Component<any> | React.Component<any> | string  ,
    rightElement?: ()=>React.Component<any> | IconProps | React.Component<any> | Actions | ToolbarMenuType ,
    onRightElementPress?: (any) => void,
    containerStyle?:ViewStyle,
    leftElementContainerStyle?:ViewStyle,
    leftElementStyle?:ViewStyle,
    rightElementContainerStyle?:ViewStyle,
    rightElementStyle?:ViewStyle,
    centerElementContainerStyle?:ViewStyle,
    titleStyle?:ViewStyle,
}

export class Toolbar extends React.Component<ToolbarProps>{}

type BadgeStyle = {
    container?:   ViewStyle
}

interface BadgeProps {
    children?: React.ReactElement,
    text?: string,
    icon?:IconProps,
    size?: number,
    style?: BadgeStyle,
    nodeSize?:number,
}
export class Badge extends React.Component<BadgeProps>{}
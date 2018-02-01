/**
 * @flow
 */
export type IconPropTypes={
  name?:string,
  size?:number,
  color?:string,
  type?:string,
  style?:mixed,
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
  iconPosition:string,
}

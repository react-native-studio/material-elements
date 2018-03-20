/**
 * @providesModule Icon
 * @flow
 *
 */
import React, { PureComponent } from 'react';
import {Text} from 'react-native';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import getTheme from '../styles/getTheme';
/**
 * icon 属性类型，使用export则可以在外部使用
 */
export type IconPropTypes={
  /**
   * icon的名字
   */
  name?:?string,
  /**
   * icon的尺寸
   */
  size?:?number,
  /**
   * icon的颜色
   */
  color?:?string,
  /**
   * icon的类型
   */
  type?:?string,
  /**
   * icon的样式
   */
  style?:?Text.style,
}
const iconType = {
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons'
}
const defaultProps = {
  size: null,
  color: null,
  style: null,
  type: iconType.MaterialIcons
}

class Icon extends PureComponent<IconPropTypes> {
  props: IconPropTypes
  static iconType:typeof iconType
  static defaultProps: typeof defaultProps
  /**
   * 根据所传递的type获取icon组件
   */
  getIconComponent = (): typeof VectorIcon | typeof FontAwesomeIcon | typeof IoniconIcon | typeof MaterialCommunityIconsIcon => {
    let type = this.props.type;
    let {MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons} = iconType;
    let IconComponent = VectorIcon;
    switch (type) {
      case MaterialIcons:
        IconComponent = VectorIcon;
        break;
      case FontAwesome:
        IconComponent = FontAwesomeIcon;
        break;
      case Ionicons:
        IconComponent = IoniconIcon;
        break;
      case MaterialCommunityIcons:
        IconComponent = MaterialCommunityIconsIcon;
        break;
      default:
        IconComponent = VectorIcon;
        break;
    }
    return IconComponent;
  }

  render () {
    const {name, style, size, color} = this.props;
    const {palette, spacing} = getTheme();

    const iconColor = color || palette.secondaryTextColor;
    const iconSize = size || spacing.iconSize;
    let IconComponent = this.getIconComponent();

    return (
      <IconComponent
      name={name}
      size={iconSize}
      color={iconColor}
      style={style}
      />
    )
  }
}
Icon.iconType=iconType;
Icon.defaultProps=defaultProps;
export default Icon;

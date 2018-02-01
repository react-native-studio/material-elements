/**
 * @flow
 */
import React, { PureComponent } from 'react';
import type { IconPropTypes } from '../TypeDifinition';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import getTheme from '../styles/getTheme';

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
  static defaultProps: typeof defaultProps = defaultProps

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
export default Icon;

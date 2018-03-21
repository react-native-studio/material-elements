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

  render() {
    const { image, icon, text } = this.props;
    let content = null;
    const { avatar, spacing } =getTheme();
    const styles = getStyles(this.props);

    if (icon) {
      const color = icon.color || StyleSheet.flatten(avatar.content).color;
      const size = icon.size || spacing.iconSize;
      const name=icon.name,type=icon.type,iconProps={color,size,name,type};
      content = <Icon {...iconProps} />;
    } else if (text) {
      content = <Text style={styles.content}>{text}</Text>;
    } else if (image) {
      content = <Image style={styles.image} {...image}/>;
    }


    return (
      <View style={[styles.container,{overflow: 'hidden'}]} >
        {content}
      </View>
    );
  }
}
export default Avatar;

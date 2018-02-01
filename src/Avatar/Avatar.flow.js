import React,{PureComponent} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import type {AvatarProps} from '../TypeDifinition';
import getTheme from '../styles/getTheme';
import Icon from '../Icon/Icon.flow';

const defaultProps = {
  image: null,
  icon: null,
  text: null,
  size: 48,
  style: {},
};

function getStyles(props) {
  const { avatar } = getTheme();
  const { size } = props;

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
      props.style.container,
    ],
    content: [
      avatar.content,
      local.content,
      props.style.content,
    ],
    image:[
      avatar.container,
      local.container,
      props.style.container,
    ]
  };
}
class Avatar extends PureComponent<AvatarProps>{
  props:AvatarProps
  static defaultProps:typeof defaultProps=defaultProps


  render() {
    const { image, icon, text } = this.props;

    let content = null;
    const { avatar, spacing } =getTheme();
    const styles = getStyles(this.props);

    if (icon) {
      const color = icon.color || StyleSheet.flatten(avatar.content).color;
      const size = icon.size || spacing.iconSize;
      const name=icon.name;
      const type=icon.type;
      content = <Icon name={name} type={type} color={color} size={size} />;
    } else if (text) {
      content = <Text style={styles.content}>{text}</Text>;
    } else if (image) {
      content = <Image style={styles.image} {...image}/>;
    }


    return (
      <View style={[styles.container,{overflow: 'hidden',
      }]} >
        {content}
      </View>
    );
  }
}
export default Avatar;

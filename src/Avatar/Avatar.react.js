/**
 * Avatar
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
import Icon from '../Icon';
import getTheme from '../styles/getTheme';
import light from '../styles/themes/light';
import merge from 'lodash/merge'

const propTypes = {
    /**
    * 传入Image组件属性，avatar渲染Image
    */
    image: PropTypes.shape({
      ...Image.propTypes,
    }),
    /**
    * 传入Icon属性，avatar渲染icon
    */
    icon:PropTypes.shape({
      name:PropTypes.string,
      color:PropTypes.string,
      size:PropTypes.number,
      type:PropTypes.string,
    }),
    /**
    * 传入text，avatar渲染text组件
    */
    text: PropTypes.string,
    /**
    * 仅仅用于container尺寸: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
    /**
    * avatar样式
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        content: Text.propTypes.style,
    }),
};
const defaultProps = {
    image: null,
    icon: null,
    text: null,
    size: 48,
    style: {},
};
function getStyles(props, theme) {
    const { avatar } = getTheme(theme);
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

class Avatar extends PureComponent {
    render() {
        const { image, icon, text } = this.props;

        let content = null;
        const { avatar, spacing } =getTheme(this.props.theme);
        const styles = getStyles(this.props, this.props.theme);

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
            <View style={{ flexGrow: 1 }}>
                <View style={[styles.container,{overflow: 'hidden',
                }]} >
                    {content}
                </View>
            </View>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
export default Avatar;

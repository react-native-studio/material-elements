import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { ViewPropTypes } from '../utils';
import getTheme from '../styles/getTheme';
import merge from 'lodash/merge';
import light from '../styles/themes/light'
const propTypes = {
    /**
     * badge
     */
    children: PropTypes.node,
    /**
     * badge内容
     */
    text: PropTypes.string,
    /**
     * badge里的icon内容
     */
    icon:PropTypes.shape({
      name:PropTypes.string,
      color:PropTypes.string,
      type:PropTypes.string,
      size:PropTypes.number,
    }),
    /**
     * badge container style={{ container: { width: size, height: size, borderRadius: size / 2 }}}
     */
    size: PropTypes.number,

    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
     /**
     * 整个node的尺寸
     */
    nodeSize:PropTypes.number,
};
const defaultProps = {
    children: null,
    text: null,
    icon: null,
    nodeSize:48,
    style: {
        container: {
            top: -8,
            right: -8,
        },

    },

};
function getStyles(props, theme) {
    let { badge} = getTheme(theme);
    const {palette}=merge(light,merge);
    const { accent, size,} = props;
    const local = {
        container: {},
    };
    if(size) {
      local.container.width = size;
      local.container.height = size;
      local.container.borderRadius = size / 2;
    }
    if (accent) {
        local.container.backgroundColor = palette.accentColor;
    }
    return {
        container: [
            badge.container,
            local.container,
            props.style.container,
        ],
        content: [
            badge.content,
            local.content,
            props.style.content,
        ],
    };
}

const mapIconProps = ({ icon }) => {
    let {name,type,size,color}=icon;
    let iconProps = merge(
      {size:16},
      {
        name,
        type,
        size,
        color,
      });

    return iconProps;

};


class Badge extends PureComponent {
    constructor(props, context) {
        super(props, context);


        this.renderContent = this.renderContent.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
    }
    renderContent(styles) {
        const { text, icon } = this.props;


        let content = null;


        if (icon) {
            const iconProps = mapIconProps(this.props);
            content = <Icon {...iconProps} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        }


        const contentWrapper = (
            <View style={styles.container}>
                {content}
            </View>
        );

        return contentWrapper

    }
    renderChildren() {
        const { children } = this.props;


        if (!children) {
            return null;
        }


        return children;

    }
    render() {
        const styles = getStyles(this.props, this.props.theme);
        const nodeStyle={
          flexDirection: 'row',
          justifyContent:'center',
          alignItems:'center',
          width:this.props.nodeSize
        }
        return (
            <View style={nodeStyle}>
                {this.renderChildren()}
                {this.renderContent(styles)}
            </View>
        );
    }
}


Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;



export default Badge;

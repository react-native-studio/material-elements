/**
 * @flow
 */
import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { ViewPropTypes } from '../utils';
import getTheme from '../styles/getTheme';
import merge from 'lodash/merge';
import light from '../styles/themes/light'
import type { IconPropTypes } from '../TypeDifinition/index'

type StyleType={
  container?:ViewPropTypes.style,
  outerContainer?:ViewPropTypes.style,
  content?:ViewPropTypes.style,
}
type BadgeProps={
  children:mixed,
  text?:string,
  icon?:IconPropTypes,
  style?:StyleType,
  accent?:boolean,
}
const defaultProps = {
    style: {
        container: {
            top: -8,
            right: -8,
        },

    },

};
function getStyles(props:BadgeProps) {
    let { badge} = getTheme();
    const {palette}=merge(light,merge);
    const { accent} = props;
    const local:StyleType = {
         container:{
         }
    };
    if (accent) {
      //$FlowFixMe
        local.container.backgroundColor = palette.accentColor;
    }
    props.style&&console.log(props.style.container)
    return {
        container: [
            badge.container,
            local.container,
            props.style&&props.style.container,
        ],
        content: [
            badge.content,
            local.content,
            props.style && props.style.content,
        ],
        outerContainer:[
          badge.outerContainer,
          local.outerContainer,
          props.style && props.style.outerContainer,
        ]
    };
}

const mapIconProps = ({ icon }) => {

    let iconProps={size:16};
    if(icon){
      let {name,type,size,color}=icon&&icon;
      iconProps = merge(
        {size:16},
        {
          name,
          type,
          size,
          color,
        });
    }

    return iconProps;

};


class Badge extends PureComponent<BadgeProps> {

    props:BadgeProps
    static defaultProps:typeof defaultProps=defaultProps
    constructor(props:BadgeProps) {
        super(props);

        console.log(props)

        this.renderContent = this.renderContent.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
    }
    renderContent=(styles:StyleType)=> {
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
    renderChildren=() =>{
        const { children } = this.props;

        if (!children) {
            return null;
        }

       return children;

    }
    render() {
        const styles = getStyles(this.props);
        return (
            <View style={styles.outerContainer}>
                {this.renderChildren()}
                {this.renderContent(styles)}
            </View>
        );
    }
}

export default Badge;

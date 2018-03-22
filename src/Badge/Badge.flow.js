/**
 * @flow
 */
import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import Icon from '../Icon';
import { ViewPropTypes } from '../utils';
import getTheme from '../styles/getTheme';
import merge from 'lodash/merge';
import light from '../styles/themes/light'
import type {IconPropTypes} from "../Icon/Icon.flow";

type BadgeStyle={
  container?:ViewPropTypes.style,
  outerContainer?:ViewPropTypes.style,
  content?:ViewPropTypes.style,
}
type BadgePropTypes={
  /**
   * 子元素
   */
  children:mixed,
  /**
   * badge所展示文字
   */
  text?:string,
  /**
   * badge所展示icon
   */
  icon?:IconPropTypes,
  /**
   * badge样式
   */
  style?:BadgeStyle,
  /**
   * badge强调色
   */
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
function getStyles(props:BadgePropTypes) {
    let { badge} = getTheme();
    const {palette}=merge(light,merge);
    const { accent} = props;
    const local:BadgeStyle = {
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
      let {name,type,size,color}=icon && icon;
      iconProps = merge(
        {size:16},
        {name,type,size,color,
        });
    }
    return iconProps;
};


class Badge extends PureComponent<BadgePropTypes> {
    props:BadgePropTypes
    static defaultProps:typeof defaultProps=defaultProps

    _container:any

    _width:number=0

    //TODO，此处需要注意onLayout的使用注意事项
    //只有在元素的宽高不确定的情况下，onLayout才能得出真是的宽高，即元素的style不设置width，height属性，
    //其父元素也不能设置宽高，因为父元素设置宽高之后，也间接确定了子元素的宽高
    onTextLayout=(e:any):void=>{
      let width=0;
      if (e.nativeEvent.layout.width <= e.nativeEvent.layout.height) {
        width = e.nativeEvent.layout.height+10
      } else {
        width = e.nativeEvent.layout.width + 15
      }
      if (this._width == width) {
        return
      }
      this._width = width;
      let height=e.nativeEvent.layout.height+10;
      let borderRadius = height / 2;
      this._container&&this._container.setNativeProps({
        style: {
          width,
          height,
          borderRadius,
        },
      });
    }

    renderContent=(styles:BadgeStyle)=> {
        const { text, icon } = this.props;
        let content = null,atachStyle={};
        if (icon) {
            const iconProps = mapIconProps(this.props);
            content = <Icon {...iconProps} />;
        } else if (text) {
            atachStyle={width:undefined,height:undefined}
            content = <Text onLayout={this.onTextLayout} style={styles.content}>{text}</Text>;
        }
        const contentWrapper = (
            <View ref={view=>this._container=view} style={[styles.container,atachStyle]}>
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

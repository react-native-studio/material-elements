/* eslint-disable import/no-unresolved, import/extensions */
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme'
/* eslint-enable import/no-unresolved, import/extensions */
const iconType={
    MaterialIcons:'MaterialIcons',
    FontAwesome:'FontAwesome',
    Ionicons:'Ionicons',
    MaterialCommunityIcons:'MaterialCommunityIcons'
}
const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
    type:PropTypes.string,
};
const defaultProps = {
    size: null,
    color: null,
    style: null,
    type:iconType.MaterialIcons
};
class Icon extends PureComponent {


    getStyles=()=>{
    }
    getIconComponent=()=>{
        let type=this.props.type,{MaterialCommunityIcons,FontAwesome,Ionicons,MaterialIcons}=iconType
        switch (type){
            case MaterialIcons:return VectorIcon;break;
            case FontAwesome:return FontAwesomeIcon;break;
            case Ionicons:return IoniconIcon;break;
            case MaterialCommunityIcons:return MaterialCommunityIconsIcon;break;
            default:return VectorIcon;break;
        }
    }
    render() {
        const { name, style, size, color } = this.props;
        const { palette, spacing } = getTheme({});

        const iconColor = color || palette.secondaryTextColor;
        const iconSize = size || spacing.iconSize;
        let IconComponent=this.getIconComponent();
        return (
            <IconComponent
                name={name}
                size={iconSize}
                color={iconColor}
                style={style}
            />
        );
    }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.iconType=iconType;
export default Icon;

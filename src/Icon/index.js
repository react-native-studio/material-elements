/* eslint-disable import/no-unresolved, import/extensions */
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme'
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
const defaultProps = {
    size: null,
    color: null,
    style: null,
};
class Icon extends PureComponent {
    render() {
        const { name, style, size, color } = this.props;
        const { palette, spacing } = getTheme({});

        const iconColor = color || palette.secondaryTextColor;
        const iconSize = size || spacing.iconSize;

        return (
            <VectorIcon
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
export default Icon;

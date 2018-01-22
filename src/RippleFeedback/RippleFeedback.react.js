/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';

import Color from 'color';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    /**
    * The color of the underlay that will show when the touch is active.
    */
    color: PropTypes.string,
    borderless: PropTypes.bool,
    children: PropTypes.node.isRequired,
    underlayColor:PropTypes.object,//仅仅ios和android API<21有效,
    useTouchableHighlight:PropTypes.bool,//是否使用TouchableHighlight，仅仅ios和android API<21有效
};
const defaultProps = {
    color: null,
    borderless: true,
    underlayColor:Color('#000').alpha(0.2),
    useTouchableHighlight:true,
};

function isCompatible() {
    if (Platform.OS === 'ios') {
        return false;
    }

    return Platform.Version >= 21;
}

class RippleFeedback extends PureComponent {
    render() {
        const {useTouchableHighlight, children, color, borderless, ...otherProps } = this.props;

        if (Platform.OS === 'web') {
            return (
                <TouchableOpacity {...otherProps}>
                    {children}
                </TouchableOpacity>
            );
        }

        if (!isCompatible()) {

            const Touchable=useTouchableHighlight?TouchableHighlight:TouchableWithoutFeedback;
            return (
              <Touchable {...otherProps}>
                {children}
              </Touchable>
            );
        }

        // we need to get underlayColor as props to this RippleFeedback component, because we can't
        // TouchableNativeFeedback.Ripple function on iOS devices
        const mapProps = { ...otherProps };

        if (color) {
            mapProps.background = TouchableNativeFeedback.Ripple(color, borderless);
        }

        return (
            <TouchableNativeFeedback {...mapProps} >
                {children}
            </TouchableNativeFeedback>
        );
    }
}

RippleFeedback.propTypes = propTypes;
RippleFeedback.defaultProps = defaultProps;

export default RippleFeedback;

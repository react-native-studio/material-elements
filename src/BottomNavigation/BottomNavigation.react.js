/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated, Easing, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */

import BottomNavigationAction from './BottomNavigationAction.react';
import getTheme from '../styles/getTheme'

const propTypes = {
    /**
    * 活跃的tab的key
    */
    active: PropTypes.string,
    /**
    * BottomNavigation.Action nodes
    */
    children: PropTypes.node.isRequired,
    /**
    * 是否隐藏bottom navigation，只有hidden改变时有效
    */
    hidden: PropTypes.bool,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
};
const defaultProps = {
    active: null,
    hidden: false,
    style: {},
};
/**
* Component for bottom navigation
* https://material.google.com/components/bottom-navigation.html
*/
class BottomNavigation extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            styles: this._getStyles(),
            moveAnimated: new Animated.Value(0),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.style !== this.props.style) {
            this.setState({ styles:this._getStyles() });
        }

        if (nextProps.hidden !== this.props.hidden) {
            if (nextProps.hidden === true) {
                this.hide();
            } else {
                this.show();
            }
        }
    }
    _getStyles=()=>{
            let props=this.props;
            const { bottomNavigation } = getTheme(this.props.theme);
            const local = {};

            return {
                container: [
                    bottomNavigation.container,
                    local.container,
                    props.style.container,
                ],
            };
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        const { moveAnimated, styles } = this.state;

        Animated.timing(moveAnimated, {
            toValue: StyleSheet.flatten(styles.container).height,
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    render() {
        const { active, children } = this.props;
        const { styles } = this.state;

        return (
            <Animated.View
                style={[styles.container, {
                    transform: [{
                        translateY: this.state.moveAnimated,
                    }],
                }]}
            >
                {React.Children.map(
                    children,
                    child => React.cloneElement(child, {
                        ...child.props,
                        active: child.key === active,
                    }),
                )}
            </Animated.View>
        );
    }
}

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;

BottomNavigation.Action = BottomNavigationAction;

export default BottomNavigation;

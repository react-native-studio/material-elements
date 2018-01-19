import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RippleFeedback from '../RippleFeedback';
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

const propTypes = {
    children: PropTypes.node,

    onPress: PropTypes.func,

    style: PropTypes.shape({
      container:ViewPropTypes.style,
    }),
  /**
   * 是否水平铺满
   */
  fullWidth:PropTypes.bool,
};
const defaultProps = {
    children: null,
    onPress: null,
    style: {},
};
function getStyles(props) {
    const { card } =getTheme(props.theme);

    const local = {};

    if (props.fullWidth) {
        local.container = {
            marginHorizontal: 0,
        };
    }

    return {
        container: [
            card.container,
            local.container,
            props.style.container,
        ],
    };
}

class Card extends PureComponent {
    render() {
        const { onPress, children } = this.props;

        const styles = getStyles(this.props);

        const content = (
            <View style={styles.container}>
                {children}
            </View>
        );

        if (onPress) {
            return (
                <RippleFeedback onPress={onPress} pointerEvents="box-only">
                    {content}
                </RippleFeedback>
            );
        }

        return content;
    }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;

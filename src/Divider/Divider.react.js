/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from '../styles/getTheme'

const propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object,
};
const defaultProps = {
    inset: false,
    style: {},
};
class Divider extends PureComponent {

    _getStyles=()=>{
            let props=this.props;
            const { divider } = getTheme(props.theme);

            const local = {
                container: props.inset ? { marginLeft: 72 } : null,
            };

            return {
                container: [
                    divider.container,
                    local.container,
                    props.style.container,
                ],
            };

    }
    render() {
        const styles = this._getStyles();

        return (
            <View style={styles.container} />
        );
    }
}

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
export default Divider;

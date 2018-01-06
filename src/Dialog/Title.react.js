/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from '../styles/getTheme'

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    style: {},
};
class DialogHeader extends PureComponent {

    _getStyles=()=>{
            let props=this.props;

            const { dialog } =getTheme(props.theme);

            return {
                titleContainer: [
                    dialog.titleContainer,
                    props.style.titleContainer,
                ],
                titleText: [
                    dialog.titleText,
                    props.style.titleText,
                ],
            };
    }
    render() {
        const { children } = this.props;

        const styles = this._getStyles();

        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {children}
                </Text>
            </View>
        );
    }
}

DialogHeader.propTypes = propTypes;
DialogHeader.defaultProps = defaultProps;

export default DialogHeader;

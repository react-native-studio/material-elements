/* eslint-disable import/no-unresolved, import/extensions */
import {View} from 'react-native';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from '../styles/getTheme'

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    style: {},
};

class DialogContent extends PureComponent {

    _getStyles = () => {
        let props = this.props
        const {dialog} = getTheme(props.theme);

        return {
            contentContainer: [
                dialog.contentContainer,
                props.style.contentContainer,
            ],
        };
    }

    render() {
        const {children} = this.props;

        const styles = this._getStyles();

        return (
            <View style={styles.contentContainer}>
                {children}
            </View>
        );
    }
}

DialogContent.propTypes = propTypes;
DialogContent.defaultProps = defaultProps;

export default DialogContent;

/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
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
class DialogFooter extends PureComponent {

    _getStyles=()=>{
            let props=this.props;
            const { dialog } = getTheme(props.theme);

            return {
                actionsContainer: [
                    dialog.actionsContainer,
                    props.style.actionsContainer,
                ],
            };
    }
    render() {
        const { children } = this.props;

        const styles = this._getStyles();

        return (
            <View style={styles.actionsContainer}>
                {children}
            </View>
        );
    }
}

DialogFooter.propTypes = propTypes;
DialogFooter.defaultProps = defaultProps;

export default DialogFooter;

/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';

import Title from './Title.react';
import Content from './Content.react';
import Actions from './Actions.react';
import getTheme from '../styles/getTheme'

const propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};
const defaultProps = {
    onPress: null,
    style: {},
};

class Dialog extends PureComponent {

    _getStyles=()=>{
            let props=this.props;
            const { dialog } = getTheme(props.theme);

            return {
                container: [
                    dialog.container,
                    props.style.container,
                ],
            };
    }
    render() {
        const { onPress, children } = this.props;

        const styles =this._getStyles();

        return (
            <RippleFeedback onPress={onPress} >
                <View style={styles.container} pointerEvents="box-only">
                    {children}
                </View>
            </RippleFeedback>
        );
    }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

Dialog.Title = Title;
Dialog.Content = Content;
Dialog.Actions = Actions;

export default Dialog;

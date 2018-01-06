/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Button from '../Button';
import getTheme from '../styles/getTheme'

const propTypes = {
    actions: PropTypes.array.isRequired,
    onActionPress: PropTypes.func.isRequired,
};
const defaultProps = {
    style: {},
};

class DialogStackedActions extends PureComponent {

    _getStyles=()=>{
            let props=this.props;
            const { dialog } = getTheme(props.theme);

            return {
                stackedActionsContainer: [
                    dialog.stackedActionsContainer,
                    props.style.stackedActionsContainer,
                ],
            };

    }
    render() {
        const { actions, onActionPress } = this.props;

        const styles =this._getStyles();

        return (
            <View style={styles.stackedActionsContainer}>
                {actions.map(action => (
                    <Button
                        key={action}
                        primary
                        text={action}
                        onPress={onActionPress}
                        style={{
                            container: {
                                justifyContent: 'flex-end',
                            },
                        }}
                    />
                ))}
            </View>
        );
    }
}

DialogStackedActions.propTypes = propTypes;
DialogStackedActions.defaultProps = defaultProps;

export default DialogStackedActions;

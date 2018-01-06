/* eslint-disable import/no-unresolved, import/extensions */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
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

class DialogDefaultActions extends PureComponent {
    constructor(props) {
        super(props);

        this.onActionPressed = this.onActionPressed.bind(this);
    }

    _getStyles = () => {
        let props = this.props;
        const {dialog} = getTheme(props.theme);

        return {
            defaultActionsContainer: [
                dialog.defaultActionsContainer,
                props.style.defaultActionsContainer,
            ],
        };
    }

    onActionPressed(action) {
        const {onActionPress} = this.props;

        if (onActionPress) {
            onActionPress(action);
        }
    }

    render() {
        const {actions} = this.props;

        const styles = this._getStyles();

        return (
            <View style={styles.defaultActionsContainer}>
                {actions.map(action => (
                    <Button
                        key={action}
                        primary
                        text={action}
                        onPress={this.onActionPressed}
                        style={{
                            container: {
                                marginLeft: 8,
                                paddingHorizontal: 8,
                            },
                        }}
                    />
                ))}
            </View>
        );
    }
}

DialogDefaultActions.propTypes = propTypes;
DialogDefaultActions.defaultProps = defaultProps;

export default DialogDefaultActions;

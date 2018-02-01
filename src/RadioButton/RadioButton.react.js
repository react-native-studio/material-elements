/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import Checkbox from '../Checkbox';

const propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,

};
const defaultProps = {
    theme: 'light',
    disabled: false,
    checked: false,
};

class RadioButton extends PureComponent {
    onPress = () => {
        const {checked, disabled, onSelect } = this.props;

        if (disabled && !checked) {
            return;
        }

        onSelect(!checked);
    }

    render() {
        return (
            <Checkbox
                checkedIcon={{name:'radio-button-checked'}}//"radio-button-checked"
                uncheckedIcon={{name:'radio-button-unchecked'}}
                onCheck={this.onPress}
                {...this.props}
            />
        );
    }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;

/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from '../styles/getTheme'
const defaultProps = {
    style: {},
    inset: false,
    lines: 1,
};
class Subheader extends PureComponent {
    static propTypes = {
    text: PropTypes.string.isRequired,
    inset: PropTypes.bool,
    lines: PropTypes.number,
    style: PropTypes.object,
    }
    _getStyles(){
            const { subheader } = getTheme(this.props.theme);
            return {
                container: [
                    subheader.container,
                    { paddingLeft: this.props.inset ? 72 : 16 },
                    this.props.style.container,
                ],
                text: [
                    subheader.text,
                    this.props.style.text,
                ],
            };
    }
    render() {
        const { text, lines } = this.props;

        const styles = this._getStyles();

        return (
            <View style={styles.container} >
                <Text numberOfLines={lines} style={styles.text}>
                    {text}
                </Text>
            </View>
        );
    }
}

Subheader.defaultProps = defaultProps;
export default Subheader;

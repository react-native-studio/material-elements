/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Container from '../Container';

import Header from './Header.react';
import Section from './Section.react';
import getTheme from '../styles/getTheme'
const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    style: {},
};

class Drawer extends PureComponent {

    _getStyles=()=>{
            let props=this.props;
            const { drawer } = getTheme(props.theme);

            return {
                container: [
                    drawer.container,
                    props.style.container,
                ],
            };

    }
    render() {
        const { children } = this.props;

        const styles = this._getStyles();

        return (
            <Container>
                <ScrollView style={styles.container}>
                    {children}
                </ScrollView>
            </Container>
        );
    }
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

Drawer.Header = Header;
Drawer.Section = Section;

export default Drawer;

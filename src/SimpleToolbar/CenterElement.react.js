/**
 * Created by lmy2534290808 on 2018/1/6.
 */
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme'
const defaultProps = {
    style: {}
}
class CenterElement extends PureComponent {
    _getStyles=()=>{
        let props=this.props;
        let {simpleToolbar}=getTheme(props.theme);
        return {
            centerElementContainer:[
                simpleToolbar.centerElementContainer,
                props.style.centerElementContainer
            ],
            titleText:[
                simpleToolbar.titleText,
                props.style.titleText,
            ]
        }

    }

    render() {
        const styles=this._getStyles();
        return (
            <View style={styles.centerElementContainer}>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        )
    }
}
CenterElement.defaultProps = defaultProps;
export default CenterElement;

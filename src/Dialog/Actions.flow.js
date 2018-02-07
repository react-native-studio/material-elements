/**
 * @flow
 */
import {View} from 'react-native';
import React, {PureComponent} from 'react';
import getTheme from '../styles/getTheme'
import {ViewPropTypes} from "../utils/index";


const defaultProps = {
    style: {},
};
type props={
    children:any,
    style:{
        actionsContainer?:ViewPropTypes.style,
    }
}
class DialogFooter extends PureComponent<props> {

    props:props
    static defaultProps:typeof defaultProps=defaultProps

    getStyles = () => {
        let props = this.props;
        const {dialog} = getTheme();

        return {
            actionsContainer: [
                dialog.actionsContainer,
                props.style.actionsContainer,
            ],
        };
    }

    render() {
        const {children} = this.props;

        const styles = this.getStyles();

        return (
            <View style={styles.actionsContainer}>
                {children}
            </View>
        );
    }
}

export default DialogFooter;

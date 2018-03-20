/**
 * @providersModule DialogFooter
 * @flow
 */
import {View} from 'react-native';
import React, {PureComponent} from 'react';
import getTheme from '../styles/getTheme'
import {ViewPropTypes} from "../utils/index";


const defaultProps = {
    style: {},
};
type DialogFooterPropTypes={
    children:any,
    style:{
        actionsContainer?:ViewPropTypes.style,
    }
}
class DialogFooter extends PureComponent<DialogFooterPropTypes> {

    props:DialogFooterPropTypes
    static defaultProps:typeof defaultProps

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
DialogFooter.defaultProps=defaultProps;
export default DialogFooter;

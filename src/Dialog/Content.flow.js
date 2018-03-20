/**
 * @providersModule DialogContent
 * @flow
 */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import getTheme from '../styles/getTheme';
import { ViewPropTypes } from '../utils/index';

type DialogContentPropTypes = {
  children: any,
  style: {
    contentContainer?: ViewPropTypes.style,
  }
}
const defaultProps = {
  style: {},
}

class DialogContent extends PureComponent<DialogContentPropTypes> {

  props: DialogContentPropTypes

  static defaultProps:typeof defaultProps

  getStyles = () => {
    const props = this.props;
    const {dialog} = getTheme();
    return {
      contentContainer: [
        dialog.contentContainer,
        props.style.contentContainer,
      ],
    }
  }

  render () {
    const {children} = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.contentContainer}>
        {children}
      </View>
    )
  }
}
DialogContent.defaultProps=defaultProps;
export default DialogContent;

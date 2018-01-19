/* eslint-disable import/no-unresolved, import/extensions */
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import IconToggle from '../IconToggle';
import CenterElement from './CenterElement.react'
const defaultProps = {
    style: {},
    leftIconName:'arrow-back',
    rightIconName:null,
}
class SimpleToolbar extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        leftIconName:PropTypes.string,
        rightIconName:PropTypes.string,
        onLeftIconPress:PropTypes.func,
        onRightIconPress:PropTypes.func,
    }
    _onLeftIconPress=()=>{
        let {onLeftIconPress}=this.props;
        onLeftIconPress&&onLeftIconPress();
    }
    _onRightIconPress=()=>{
        let {onRightIconPress}=this.props;
        onRightIconPress&&onRightIconPress();
    }
    _getStyles = () => {
        let props = this.props;
        const {simpleToolbar} = getTheme(this.props.theme)
        return {
            container: [
                simpleToolbar.container,
                props.style.container,
            ],
            leftElement:[
                simpleToolbar.leftElement,
                props.style.leftElement
            ],
            rightElement:[
                simpleToolbar.rightElement,
                props.style.rightElement
            ],
        }
    }

    render() {
        const styles = this._getStyles();
        let {theme,leftIconName,rightIconName}=this.props;
        const flattenLeftElement = StyleSheet.flatten(styles.leftElement);
        const flattenRightElement=StyleSheet.flatten(styles.rightElement)
        return (
            <View style={styles.container}>
              {/*CenterElement元素放在中间，则会使得左侧的Icon无法使用onPress*/}
              {/*在ReactNative 中，当view设置了position属性后，图层变低，但是比其前面的图层高。子view的图层高于父view的图层*/}
              <CenterElement theme={theme} title={this.props.title}/>
              <IconToggle
                    key={leftIconName}
                    name={leftIconName}
                    color={flattenLeftElement.color}
                    onPress={this._onLeftIconPress}
                    style={flattenLeftElement}
                />
                {rightIconName&&<IconToggle
                    key={rightIconName}
                    name={rightIconName}
                    color={flattenRightElement.color}
                    onPress={this._onRightIconPress}
                    style={flattenRightElement}
                />}
            </View>
        )
    }
}
SimpleToolbar.defaultProps = defaultProps
export default SimpleToolbar

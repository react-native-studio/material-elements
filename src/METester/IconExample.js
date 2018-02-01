
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.flow'
import CenterContainer from './CenterContainer'
export default class IconExample extends Component{
  render(){
    return(
      <CenterContainer>
        <Icon name="arrow-back"/>
        <Icon size={36} type={Icon.iconType.Ionicons} name="ios-arrow-back" color="red"/>
      </CenterContainer>
    )
  }
}

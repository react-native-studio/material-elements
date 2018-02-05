import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from './CenterContainer';
import Avatar from '../Avatar/Avatar.flow'
export default class AvatarExample extends Component{
  render(){
    return(<CenterContainer>
      <Avatar text="m"/>
      <Avatar icon={{name:'menu'}}/>
      <Avatar  image={{source:require('./Images/launch-icon.png')}}/>

    </CenterContainer>)
  }
}

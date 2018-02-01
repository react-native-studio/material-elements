import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from './CenterContainer';
import Button from '../Button/Button.flow'
export default class ButtonExample extends Component{
  render(){
  return(
    <CenterContainer>
      <Button text="button"/>
      <Button text="button" primary/>
      <Button text="button" accent/>
      <Button text="button" raised/>
      <Button text="button" raised primary/>
      <Button text="button" raised accent/>
      <Button text="button" icon={{name:'arrow-back'}}/>
      <Button text="button" icon={{name:'ios-arrow-back',type:'Ionicons'}}/>
      <Button text="button" iconPosition="right" icon={{name:'arrow-back'}}/>
      <Button text="button" iconPosition="right" icon={{name:'ios-arrow-back',type:'Ionicons'}}/>
    </CenterContainer>
      )
  }
}

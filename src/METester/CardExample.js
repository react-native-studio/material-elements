import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Card from '../Card/Card.flow'
export default class CardExample extends Component{
  render(){
    return(<Card style={{container:{height:50}}}></Card>)
  }
}

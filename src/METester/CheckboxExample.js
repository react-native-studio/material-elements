import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from './CenterContainer'
import Checkbox from '../Checkbox'
export default class CheckboxExample extends Component{
  state={
    value:false
  }
  render(){
    return(<CenterContainer>
      <Checkbox onCheck={value=>this.setState({value}) } checked={this.state.value}/>
    </CenterContainer>)
  }
}

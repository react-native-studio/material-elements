import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from "./CenterContainer";
import Radio from '../RadioButton'
export default class RadioButtonExample extends Component{
    state={
        value:true
    }
  render(){
      return(<CenterContainer>
          <Radio onSelect={(value)=>{
              this.setState({value})
          }} checked={this.state.value}/>
      </CenterContainer>)
  }
}
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Container from '../Container'
import ActionButton from '../ActionButton'
export default class ActionButtonExample extends Component{
  render(){
    return(<View style={{flex:1}}>
      <ActionButton onPress={()=>{}} actions={[{
        icon:{name:'arrow-back'},
        label:'arrow',
        name:'arrow'
      },{
        icon:{name:'done'},
        label:'done',
        name:'done'
      }]} transition={'speedDial'}/>
    </View>)
  }
}

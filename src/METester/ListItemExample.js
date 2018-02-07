import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem.flow'
  ''
export default class ListItemExample extends Component{
  render(){
    return(<View>
      <ListItem divider onPress={()=>{}} leftElement={{name:'arrow-back'}}/>
      <ListItem divider onPress={()=>{}}  leftElement={{name:'arrow-back'}} centerElement="title"/>
      <ListItem divider onPress={()=>{}}  leftElement={{name:'arrow-back'}} centerElement={{primaryText:'title',secondaryText:'second'}}/>
      <ListItem divider onPress={()=>{}}  leftElement={{name:'arrow-back'}} rightElement={{menu:{labels:['1','2','3','4']}}}/>
      <ListItem divider onPress={()=>{}}  leftElement={{name:'arrow-back'}} centerElement="title"
                 rightElement={[{name:'done'},{name:'arrow-back'},{name:'menu'}]}/>

    </View>)
  }
}

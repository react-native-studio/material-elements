import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Badge from '../Badge'
export default class BadgeExmaple extends Component{
  render(){
    return(<View style={{flex:1,paddingVertical:20}}>
      <Badge style={{
        outerContainer:styles.badge1
      }} text="12345sdfsdfsdf">
        <Text>BadgeExample</Text>
      </Badge>
      <Badge style={{outerContainer:styles.badge2}} accent text="1">
        <Text>BadgeExample</Text>
      </Badge>
      <Badge style={{outerContainer:styles.badge2}} accent icon={{
        name:'arrow-back',color:'white'
      }}>
        <Text>BadgeExample</Text>
      </Badge>
    </View>)
  }
}
const styles=StyleSheet.create({
  badge1:{
    width:130
  },
  badge2:{
    width:110,
    marginTop:20
  }
})

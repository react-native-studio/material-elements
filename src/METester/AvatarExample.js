import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from './CenterContainer';
import Avatar from '../Avatar/Avatar.flow'

export default class AvatarExample extends Component {
  render() {
    return (<CenterContainer>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
        <Avatar text="m"/>
        <Avatar text="m" size={60}/>
        <Avatar text="m" size={100}/>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end',marginTop:20}}>
        <Avatar icon={{name: 'menu'}}/>
        <Avatar icon={{name: 'menu'}} size={60}/>
        <Avatar icon={{name: 'menu'}} size={100}/>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end',marginTop:20}}>
        <Avatar image={{source: require('./Images/launch-icon.png')}}/>
        <Avatar image={{source: require('./Images/launch-icon.png')}} size={60}/>
        <Avatar image={{source: require('./Images/launch-icon.png')}} size={100}/>
      </View>
    </CenterContainer>)
  }
}

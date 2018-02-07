import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Dialog from '../Dialog'
import DialogDefaultActions from '../Dialog/DialogDefaultActions.react';
import DialogStackedActions from '../Dialog/DialogStackedActions.react'
import CenterContainer from './CenterContainer'
export default class DialogExample extends Component{
  render(){
    return(<CenterContainer>
      <Dialog>
        <Dialog.Title><Text>Hello world</Text></Dialog.Title>
        <Dialog.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
            actions={['Dismiss', 'Keep']}
            onActionPress={() => {}}
          />
        </Dialog.Actions>
      </Dialog>
    </CenterContainer>)
  }
}

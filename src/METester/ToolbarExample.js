import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar/Toolbar.flow';
export default class ToolbarExample extends Component{
  render(){
    return(<View>
   <Toolbar leftElement={{name:'arrow-back'}} centerElement="title"/>
      <Toolbar leftElement={{name:'arrow-back'}} centerElement="title" rightElement={{
      name:'menu'
    }}
    />
      <Toolbar leftElement={{name:'arrow-back'}} centerElement="title" rightElement={[
        {name:'arrow-back'},{name:'done'}
      ]}
      />
      <Toolbar leftElement={{name:'arrow-back'}} centerElement="title" rightElement={{menu:{
        labels:['item1','item2','item3']
      }}}
      />
      <Toolbar leftElement={{name:'arrow-back'}} centerElement="title" rightElement={{menu:{
        labels:[{text:'item1',icon:{name:'arrow-back'}},
          {text:'item2',icon:{name:'done'}},
          {text:'item3',icon:{name:'menu'}}]
      }}}
      />
    </View>)
  }
}

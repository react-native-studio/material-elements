import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import CenterContainer from './CenterContainer';
import Menu from '../Menu';
export default class MenuExample extends Component{

  hide=(menu)=>{
    menu && menu.hide()
  }
  show=(menu)=>{
    menu && menu.show()
  }
  render(){
    return(<View style={{paddingVertical:20,flex:1}}>
      <Menu ref={menu=>this.menu1=menu} button={
        <Text style={{fontSize:16}} onPress={()=>this.show(this.menu1)}>left_top</Text>}>
        <Menu.Item text="item1" onPress={()=>this.hide(this.menu1)}/>
        <Menu.Item text="item2" onPress={()=>this.hide(this.menu1)}/>
        <Menu.Item text="item3" onPress={()=>this.hide(this.menu1)}/>
      </Menu>
      <View style={{position:'absolute',right:0,top:20}}>
        <Menu ref={menu=>this.menu2=menu} button={
          <Text style={{fontSize:16}} onPress={()=>this.show(this.menu2)}>right_top</Text>}>
          <Menu.Item text="item1" onPress={()=>this.hide(this.menu2)}/>
          <Menu.Item text="item2" onPress={()=>this.hide(this.menu2)}/>
          <Menu.Item text="item3" onPress={()=>this.hide(this.menu2)}/>
        </Menu>
      </View>
      <View style={{position:'absolute',left:0,bottom:20}}>
        <Menu ref={menu=>this.menu3=menu} button={
          <Text style={{fontSize:16}} onPress={()=>this.show(this.menu3)}>left_bottom</Text>}>
          <Menu.Item text="item1" onPress={()=>this.hide(this.menu3)}/>
          <Menu.Item text="item2" onPress={()=>this.hide(this.menu3)}/>
          <Menu.Item text="item3" onPress={()=>this.hide(this.menu3)}/>
        </Menu>
      </View>
      <View style={{position:'absolute',right:0,bottom:20}}>
        <Menu ref={menu=>this.menu4=menu} button={
          <Text style={{fontSize:16}} onPress={()=>this.show(this.menu4)}>right_bottom</Text>}>
          <Menu.Item text="item1" onPress={()=>this.hide(this.menu4)}/>
          <Menu.Item text="item2" onPress={()=>this.hide(this.menu4)}/>
          <Menu.Item text="item3" onPress={()=>this.hide(this.menu4)}/>
        </Menu>
      </View>
    </View>)
  }
}

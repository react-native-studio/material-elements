import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import BottomSheet from '../BottomSheet/BottomSheet.flow'
export default class BottomSheetExample extends Component{
  state={
    visible:false,
    visible1:false,
  }
  render(){
    return(<View style={{flex:1}}>
      <Text onPress={()=>{
        this.setState({visible:true})
      }}>openBottomSheetListItem</Text>
      <Text onPress={()=>{
        this.setState({visible1:true})
      }}>openBottomSheetGridItem</Text>
      <BottomSheet style={{container:{backgroundColor:'transparent'}}} renderType="list"  title="bottomSheet" onClosed={()=>{
        this.setState({visible:false})
      }} visible={this.state.visible}>
        <BottomSheet.ListItem onPress={()=>{alert('1')}} text="arrow-back" icon={{name:'arrow-back'}}/>
        <BottomSheet.ListItem text="arrow-back" icon={{name:'arrow-back'}}/>
        <BottomSheet.Divider/>
        <BottomSheet.ListItem text="arrow-back" icon={{name:'arrow-back'}}/>
      </BottomSheet>
      <BottomSheet style={{container:{backgroundColor:'transparent'}}} renderType="grid"  title="bottomSheet" onClosed={()=>{
        this.setState({visible1:false})
      }} visible={this.state.visible1}>
        <BottomSheet.GridItem onPress={()=>{alert('1')}} text="arrow1" icon={{name:'arrow-back'}}/>
        <BottomSheet.GridItem text="arrow2" icon={{name:'arrow-back'}}/>
        <BottomSheet.GridItem text="arrow3" icon={{name:'arrow-back'}}/>
        <BottomSheet.GridItem text="arrow3" icon={{name:'arrow-back'}}/>
        <BottomSheet.GridItem text="arrow3" icon={{name:'arrow-back'}}/>
        <BottomSheet.GridItem text="arrow3" icon={{name:'arrow-back'}}/>
      </BottomSheet>
    </View>)
  }
}

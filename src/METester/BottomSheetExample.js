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
      <BottomSheet renderType="list"  title="操作" onClosed={()=>{
        this.setState({visible:false})
      }} visible={true}>
        <BottomSheet.ListItem text="分享" icon={{name:'share'}}/>
        <BottomSheet.ListItem text="上传" icon={{name:'cloud-upload'}}/>
        <BottomSheet.ListItem text="复制" icon={{name:'content-copy'}}/>
        <BottomSheet.Divider/>
        <BottomSheet.ListItem text="打印" icon={{name:'print'}}/>
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

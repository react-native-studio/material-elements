import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import BSListItem from './BSListItem'

const defaultProps={
  style:{},
}
class BottomSheet extends Component{

  static propTypes={
    title:PropTypes.string,
  }

  getStyles=()=>{
    const {bottomSheet}=getTheme();

    const {props}=this;

    return {
      container:[
        bottomSheet.container,
        props.style.container,
      ],
      content:[
        bottomSheet.content,
        props.style.content,
      ],
      titleContainer:[
        bottomSheet.titleContainer,
        props.style.titleContainer,
      ],
      title:[
        bottomSheet.title,
        props.style.title,
      ]
    }
  }

  renderTitle(styles){

    const {title}=this.props;

    if(!title){
      return null;
    }

    return (
      <View style={styles.titleContainer}>
        <Text>
          {title}
        </Text>
      </View>
    )
  }
  render(){

    const styles=this.getStyles();

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        {this.renderTitle(styles)}
        {this.props.children}
      </View>
    </View>
  )
  }
}
BottomSheet.defaultProps=defaultProps;
BottomSheet.ListItem=BSListItem;
export default BottomSheet;

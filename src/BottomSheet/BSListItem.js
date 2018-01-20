import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import Icon from '../Icon';
import RippleFeedBack from '../RippleFeedback';

const defaultProps={
  style:{},
}
class BSListItem extends Component{

  static propTypes={
    icon:PropTypes.shape({
      name:PropTypes.string,
      type:PropTypes.string,
      size:PropTypes.number,
      color:PropTypes.string,
    }),
    text:PropTypes.string,

  }

  _getStyles=()=>{

    const {bottomSheetListItem}=getTheme();

    const {props}=this;

    return {
      container:[
        bottomSheetListItem.container,
        props.style.container,
      ],
      text:[
        bottomSheetListItem.text,
        props.style.text,
      ],
      icon:[
        bottomSheetListItem.icon,
        props.style.icon,
      ]
    }
  }
  _renderIcon=(styles)=>{

    const {icon}=this.props;

    if(!icon){
      return null;
    }

    const {name,color,size,type}=icon;

    const iconSize=size || 24;

    const iconProps={
      name,
      color,
      type,
      size:iconSize,
    }

    return <Icon style={styles.icon} {...iconProps}/>

  }
  render(){

    const styles=this._getStyles();

    const {text,onPress}=this.props;

    return(
      <RippleFeedBack onPress={onPress}>
      <View style={styles.container}>
        {this._renderIcon(styles)}
        <Text style={styles.text}>{text}</Text>
      </View>
      </RippleFeedBack>
    )
  }
}
BSListItem.defaultProps=defaultProps;
export default BSListItem;

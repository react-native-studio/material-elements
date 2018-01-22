import React,{Component} from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import Icon from '../Icon';
import RippleFeedBack from '../RippleFeedback';

const {width}=Dimensions.get('window')
const defaultProps={
  style:{},
}
class BSGridItem extends Component{

  static propTypes={
    /**
     * icon
     */
    icon:PropTypes.shape({
      name:PropTypes.string,
      type:PropTypes.string,
      size:PropTypes.number,
      color:PropTypes.string,
    }),
    /**
     * text
     */
    text:PropTypes.string,
    /**
     * 在grid布局中的索引，从1开始
     */
    itemIndex:PropTypes.number,
    /**
     * bottonsheet是否有title
     */
    isHaveTitle:PropTypes.bool,
  }

  _getStyles=()=>{

    const {bottomSheetGridItem,bottomSheet}=getTheme();

    const {props}=this;

    return {
      container:[
        bottomSheetGridItem.container,
        props.style.container,
      ],
      text:[
        bottomSheetGridItem.text,
        props.style.text,
      ],
      gridContent:[bottomSheet.gridContent]
    }
  }
  _renderIcon=(styles)=>{

    const {icon}=this.props;

    if(!icon){
      return null;
    }

    const {name,color,size,type}=icon;

    const iconSize=size || 48;

    const iconProps={
      name,
      color,
      type,
      size:iconSize,
    }

    return <Icon {...iconProps}/>

  }
  render(){

    const styles=this._getStyles();

    const {text,onPress,itemIndex,isHaveTitle}=this.props;

    const marginSize=(width-StyleSheet.flatten(styles.gridContent).paddingHorizontal*2-StyleSheet.flatten(styles.container).width*3)/2
    const attachStyle=(itemIndex+1)%3===0?{marginHorizontal:marginSize}:{};
    const attachStyle2=isHaveTitle&& itemIndex<=3?{marginTop:0}:{}
    return(
      <RippleFeedBack onPress={onPress}>
        <View style={[styles.container,attachStyle,attachStyle2]}>
          {this._renderIcon(styles)}
          <Text style={styles.text}>{text}</Text>
        </View>
      </RippleFeedBack>
    )
  }
}
BSGridItem.defaultProps=defaultProps;
export default BSGridItem;

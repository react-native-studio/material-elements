import React,{Component,PureComponent} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import getTheme from '../styles/getTheme';
import BSListItem from './BSListItem';
import {MotionDuration,MotionCurve} from '../utils';
import Modal from '../Modalbox/ModalBox';
import BSDivider from './BSDivider'
import BSGridItem from './BSGridItem'

const defaultProps={
  style:{},
  title:null,
}

class BottomSheet extends PureComponent{

  static propTypes={
    /**
     * bottomsheet的title
     */
    title:PropTypes.string,
    /**
     * bottonsheet是否可见
     */
    visible:PropTypes.bool,
    /**
     * buttonsheet离开时触发
     */
    onClosed:PropTypes.func,
    /**
     * buttonsheet进入时触发
     */
    onOpened:PropTypes.func,
    /**
     * 以list方式呈现
     */
    listItems:PropTypes.arrayOf(PropTypes.shape({
      icon:PropTypes.shape({
        name:PropTypes.string,
        type:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
      }),
      text:PropTypes.string,
    })),
    /**
     * 以grid方式呈现
     */
    gridItems:PropTypes.arrayOf(PropTypes.shape({
      icon:PropTypes.shape({
        name:PropTypes.string,
        type:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
      }),
      text:PropTypes.string,
    })),
    /**
     * divider对应的item,从0开始,对于grid布局，暂且不支持divider
     */
    itemDivider:PropTypes.number,
    /**
     * item press时触发，传递{text,index}参数
     */
    onItemPress:PropTypes.func,
  }
  getStyles=()=>{
    const {bottomSheet}=getTheme();

    const {props}=this;

    const {listItems,gridItems}=props;


    return {
      container:[
        bottomSheet.container,
        props.style.container,
      ],
      listContent:[
        bottomSheet.listContent,
        props.style.listContent,
      ],
      listTitleContainer:[
        bottomSheet.listTitleContainer,
        props.style.listTitleContainer,
      ],
      title:[
        bottomSheet.title,
        props.style.title,
      ],
      gridContent:[
        bottomSheet.gridContent,
        props.style.gridContent,
      ],
      gridTitleContainer:[
        bottomSheet.gridTitleContainer,
        props.style.gridTitleContainer,
      ]
    }
  }
  renderTitle(styles){

    const {title,listItems,gridItems}=this.props;

    const titleContainerStyle=listItems?styles.listTitleContainer:styles.gridTitleContainer;

    if(!title){
      return null;
    }
    return (
      <View  style={titleContainerStyle} >
        <Text>
          {title}
        </Text>
      </View>
    )
  }

  onItemPress=(params)=>{

    const {onItemPress}=this.props;

    onItemPress && onItemPress(params)
  }
  renderContent=()=>{

    const {listItems,gridItems,title,itemDivider}=this.props;

    const styles=this.getStyles();

    const attachStyles=title?{paddingTop:0}:{};

    if(listItems){
      return (
        <View style={[styles.listContent,attachStyles]}>
          {this.renderTitle(styles)}
          {listItems.map((item,index)=>{
            let itemComponent=<BSListItem
              onPress={()=>this.onItemPress({text:item.text,index})}
              text={item.text}
              icon={item.icon}
              key={index}/>;
            if(itemDivider===index){
              itemComponent=(
                <View key={index}>
                  <BSListItem onPress={()=>this.onItemPress({text:item.text,index})} text={item.text} icon={item.icon}/>
                  <BSDivider/>
                </View>
              )
            }
              return itemComponent;
            }
          )}
        </View>
      )
    }else if(gridItems){

      return (
        <View style={[styles.gridContent,attachStyles]}>
          {this.renderTitle(styles)}
          {gridItems.map((item,index)=>{
            let itemComponent= <BSGridItem onPress={()=>this.onItemPress({text:item.text,index})} isHaveTitle={title!=null} icon={item.icon} itemIndex={index+1} key={index} text={item.text}/>

            return itemComponent;
          })}
        </View>
      )
    }
  }
  render(){

    const styles=this.getStyles();

    const {visible,onOpened,onClosed}=this.props;
    return(

      <Modal
        isOpen={visible}
        coverScreen
        style={styles.container}
        backdrop={true}
        position={"bottom"}
        backdropOpacity={0.1}
        animationDuration={225}
        easing={MotionCurve.accelerationCurve}
        onClosed={onClosed}
        onOpened={onOpened}
        >
        {this.renderContent()}
      </Modal>
    )
  }
}
BottomSheet.defaultProps=defaultProps;
BottomSheet.ListItem=BSListItem;
BottomSheet.Divider=BSDivider;
export default BottomSheet;

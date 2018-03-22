/**
 * @providersModule ListItem
 * @flow
 */
import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    NativeModules,
    findNodeHandle,
    Platform,
} from 'react-native';

import Divider from '../Divider';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'
import type { IconPropTypes } from '../Icon/Icon.flow'
import Menu from '../Menu'

const UIManager = NativeModules.UIManager;

type ListItemStyle={
  container?:ViewPropTypes.style,
  content?:ViewPropTypes.style,
  contentViewContainer?:ViewPropTypes.style,
  leftElementContainer?:ViewPropTypes.style,
  centerElementContainer?:ViewPropTypes.style,
  textViewContainer?:ViewPropTypes.style,
  primaryText?:Text.propTypes.style,
  firstLine?:Text.propTypes.style,
  primaryTextContainer?:ViewPropTypes.style,
  secondaryText?:Text.propTypes.style,
  tertiaryText?:Text.propTypes.style,
  rightElementContainer?:ViewPropTypes.style,
  leftElement?:Text.propTypes.style,
  rightElement?:Text.propTypes.style
}
type NumberOfLines=1 | 2 |3 | 'dynamic';
/**
 * Menu类型
 */
type MenuType={
  menu:{
    labels:Array<string>
  }
};
/**
 * Actions类型
 */
type Actions={
  actions:Array<IconPropTypes>
}
/**
 * ListItem 属性类型
 */
export type ListItemPropTypes={
  dense?:boolean,
  /**
   * 是否有分割线
   */
  divider?:boolean,
  /**
   * ListItem 按下时触发
   */
  onPress?:(value:any)=>void,
  /**
   * ListItem 长按时触发
   */
  onLongPress?:(value:any)=>void,
  /**
   * 行数设置
   */
  numberOfLines?:NumberOfLines,
  /**
   * ListItem 样式设置
   */
  style:ListItemStyle | typeof defaultProps.style,
  /**
   * 左边元素内容，可以是icon也可以是Component
   */
  leftElement:IconPropTypes| React.Component<any>,
  /**
   * 右边元素内容，相对于左边元素，增加了MenuType，Actions，Array<IconPropTypes>类型
   */
  rightElement:IconPropTypes | React.Component<any> |MenuType|Actions|Array<IconPropTypes>,
  /**
   * 中间元素，可以是文字，组件和{primaryText:string,secondaryText:string,tertiaryText:string} json组合
   */
  centerElement: string| React.Component<any>|{primaryText:string, secondaryText:string,tertiaryText:string},
  /**
   * 子元素
   */
  children:any,
  /**
   * 左边元素按下时触发
   */
  onLeftElementPress:(value?:any)=>void,
  /**
   * 右边元素按下时触发
   */
  onRightElementPress:(value?:any)=>void,
  onPressValue?:any,
}
type ListItemState={
  numberOfLines:NumberOfLines
}
const defaultProps = {
    dense: false,
    onPress: null,
    onPressValue: null,
    onLongPress: null,
    divider: false,
    leftElement: null,
    onLeftElementPress: null,
    centerElement: null,
    rightElement: null,
    onRightElementPress: null,
    numberOfLines: 1,
    children: null,
    style: {},
};
function getNumberOfSecondaryTextLines(numberOfLines:NumberOfLines) {
    if (numberOfLines === 'dynamic') {
        return null;
    }

    return numberOfLines - 1;
}
function getNumberOfLines(props:ListItemPropTypes) {
    const { numberOfLines, centerElement } = props;

    if (centerElement && centerElement.secondaryText && centerElement.tertiaryText
        && (!numberOfLines || typeof numberOfLines =='number'&&numberOfLines < 3)) {
        return 3;
    } else if (centerElement && centerElement.secondaryText &&
        (!numberOfLines || typeof numberOfLines =='number'&&numberOfLines < 2)) {
        return 2;
    }

    return numberOfLines || 1;
}
/**
* Please see this: https://material.google.com/components/lists.html#lists-specs
*/
function getListItemHeight(props:ListItemPropTypes, state:ListItemState) {
    const { leftElement, dense } = props;
    const { numberOfLines } = state;

    if (numberOfLines === 'dynamic') {
        return null;
    }

    if (!leftElement && numberOfLines === 1) {
        return dense ? 40 : 48;
    }

    if (numberOfLines === 1) {
        return dense ? 48 : 56;
    } else if (numberOfLines === 2) {
        return dense ? 60 : 72;
    } else if (numberOfLines === 3) {
        return dense ? 80 : 88;
    }

    return null;
}
class ListItem extends React.PureComponent<ListItemPropTypes,ListItemState> {

    props:ListItemPropTypes
    state:ListItemState
    androidMenu:any
    iosMenu:any
    static defaultProps:typeof defaultProps
    constructor(props:ListItemPropTypes) {
        super(props);

        this.state = {
            numberOfLines: getNumberOfLines(props),
        };
    }
    componentWillReceiveProps(nextProps:ListItemPropTypes) {
        this.setState({ numberOfLines: getNumberOfLines(nextProps) });
    }
    getStyles=()=>{
            let props=this.props,state=this.state;
            const { rightElement } = props;
            const { listItem } = getTheme();
            const { numberOfLines } = state;


            const container = {
                height: getListItemHeight(props, state),
            };
            const contentViewContainer = {};
            const leftElementContainer = {};

            if (numberOfLines === 'dynamic') {
                contentViewContainer.paddingVertical = 16;
                leftElementContainer.alignSelf = 'flex-start';
            }

            if (!rightElement) {
                contentViewContainer.paddingRight = 16;
            }

            return {
                container: [
                    listItem.container,
                    container,
                    props.style.container,
                ],
                content: [
                    listItem.content,
                    props.style.content,
                ],
                contentViewContainer: [
                    listItem.contentViewContainer,
                    contentViewContainer,
                    props.style.contentViewContainer,
                ],
                leftElementContainer: [
                    listItem.leftElementContainer,
                    leftElementContainer,
                    props.style.leftElementContainer,
                ],
                centerElementContainer: [
                    listItem.centerElementContainer,
                    props.style.centerElementContainer,
                ],
                textViewContainer: [
                    listItem.textViewContainer,
                    props.style.textViewContainer,
                ],
                primaryText: [
                    listItem.primaryText,
                    props.style.primaryText,
                ],
                firstLine: [
                    listItem.firstLine,
                    props.style.firstLine,
                ],
                primaryTextContainer: [
                    listItem.primaryTextContainer,
                    props.style.primaryTextContainer,
                ],
                secondaryText: [
                    listItem.secondaryText,
                    props.style.secondaryText,
                ],
                tertiaryText: [
                    listItem.tertiaryText,
                    props.style.tertiaryText,
                ],
                rightElementContainer: [
                    listItem.rightElementContainer,
                    props.style.rightElementContainer,
                ],
                leftElement: [
                    listItem.leftElement,
                    props.style.leftElement,
                ],
                rightElement: [
                    listItem.rightElement,
                    props.style.rightElement,
                ],
            };

    }
    onMenuPressed = (labels:any) => {
        const { onRightElementPress, onPressValue } = this.props;
        //UIManager.showPopupMenu只适用于android，ios没有此方法，
        UIManager.showPopupMenu(
            findNodeHandle(this.androidMenu),
            labels,
            () => {},
            (result, index) => {
                if (onRightElementPress) {
                    onRightElementPress({
                        action: 'menu',
                        result,
                        index,
                        value: onPressValue,
                    });
                }
            },
        );
    };
    onListItemPressed = () => {
        const { onPress, onPressValue } = this.props;

        if (onPress) {
            onPress(onPressValue);
        }
    };
    onListItemLongPressed = () => {
        const { onLongPress, onPressValue } = this.props;

        if (onLongPress) {
            onLongPress(onPressValue);
        }
    };
    onLeftElementPressed = () => {
        const { onLeftElementPress, onPress, onPressValue } = this.props;

        if (onLeftElementPress) {
            onLeftElementPress(onPressValue);
        } else if (onPress) {
            onPress(onPressValue);
        }
    };
    onRightElementPressed = () => {
        const { onRightElementPress, onPressValue } = this.props;

        if (onRightElementPress) {
            onRightElementPress(onPressValue);
        }
    }
    renderLeftElement = (styles:ListItemStyle) => {
        const { leftElement } = this.props;

        if (!leftElement) {
            return null;
        }

        const flattenLeftElement = StyleSheet.flatten(styles.leftElement);
        let content = null;

        if(React.isValidElement(leftElement)){
          content = (
            <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
              <View>
                {leftElement}
              </View>
            </TouchableWithoutFeedback>)
        }else{
          const {name,size,color,type}=(leftElement:IconPropTypes);

          const iconProps={
            name,
            size,
            color:color || flattenLeftElement.color,
            type,
          }
          content=(
            <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
              <Icon {...iconProps} />
            </TouchableWithoutFeedback>
          )
        }
        /*if (typeof leftElement === 'string') {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <Icon name={leftElement} color={flattenLeftElement.color} />
                </TouchableWithoutFeedback>
            );
        } else {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <View>
                        {leftElement}
                    </View>
                </TouchableWithoutFeedback>
            );
        }*/

        return (
            <View style={styles.leftElementContainer}>
                {content}
            </View>
        );
    }
    renderCenterElement = (styles:ListItemStyle) => {
        const { centerElement } = this.props;
        const numberOfLines = getNumberOfSecondaryTextLines(this.state.numberOfLines);
        let content = null;

        if (React.isValidElement(centerElement)) {
            content = centerElement;
        } else if (centerElement) {
            let primaryText = null;
            let secondaryText = null;
            let tertiaryText = null;

            if (typeof centerElement === 'string') {
                primaryText = centerElement;
            } else {
                primaryText = (centerElement:any).primaryText;
                secondaryText = (centerElement:any).secondaryText;
                tertiaryText = (centerElement:any).tertiaryText;
            }
            const secondLineNumber = !tertiaryText ? numberOfLines : 1;
            const thirdLineNumber = tertiaryText ? numberOfLines : 1;
            content = (
                <View style={styles.textViewContainer}>
                    <View style={styles.firstLine}>
                        <View style={styles.primaryTextContainer}>
                            <Text numberOfLines={1} style={styles.primaryText}>
                                {primaryText}
                            </Text>
                        </View>
                    </View>
                    {secondaryText &&
                        <View>
                            <Text numberOfLines={secondLineNumber} style={styles.secondaryText}>
                                {secondaryText}
                            </Text>
                        </View>
                    }
                    {tertiaryText &&
                        <View>
                            <Text numberOfLines={thirdLineNumber} style={styles.tertiaryText}>
                                {tertiaryText}
                            </Text>
                        </View>
                    }
                </View>
            );
        }

        return (
            <View style={styles.centerElementContainer}>
                {content}
            </View>
        );
    }
    renderRightElement = (styles:ListItemStyle) => {
        const { rightElement } = this.props;

        let content = [];
        let elements = null;


        if (Array.isArray(rightElement)) {
            elements = rightElement;
        } else if (rightElement && rightElement.actions) {
            elements = (rightElement:any).actions;
        }else if(rightElement && !rightElement.menu){
          elements=[rightElement]
        }

        const flattenRightElement = StyleSheet.flatten(styles.rightElement);

        if (elements) {
            content = elements.map((action:any,key) => {
              const {name,type,color,size} = action;

              const iconToggleProps={
                name,
                size:size ||24,
                color:color || flattenRightElement.color,
                type,
              }
              return <IconToggle
                key={key}
                style={styles.rightElement}
                {...iconToggleProps}
                onPress={() => this.onRightElementPressed()}
              />
            });
        }

        if (React.isValidElement(rightElement)) {

            content.push(React.cloneElement((rightElement:any), { key: 'customRightElement' }));
        }

        if (rightElement && rightElement.menu) {
            // We need this view as an anchor for drop down menu. findNodeHandle can
            // find just view with width and height, even it needs backgroundColor :/
            content.push((
                <View key="menuIcon">
                    <View
                        ref={c =>this.androidMenu = c}
                        style={{
                            backgroundColor: 'transparent',
                            width: StyleSheet.hairlineWidth,
                            height: StyleSheet.hairlineWidth,
                        }}
                    />
                  <Menu ref={c=>this.iosMenu=c}
                        button={<IconToggle
                          name="more-vert"
                          color={flattenRightElement.color}
                          onPress={() =>{
                            //如果是android平台使用UIManager.showPopupMenu
                            if(Platform.OS==='android'){
                              this.onMenuPressed((rightElement:any).menu.labels)
                            }else{//如果是ios平台使用Menu组件，应为ios没有实现UIManager.showPopupMenu
                              this.iosMenu && this.iosMenu.show()
                            }
                          }}
                          style={flattenRightElement}
                        />}>
                    {(rightElement:any).menu.labels.map((label,index)=>
                      <Menu.Item key={index} text={label} onPress={()=>{
                        const {onRightElementPress,onPressValue}=this.props;
                        onRightElementPress && onRightElementPress({
                          action:'menu',
                          label,
                          index,
                          value:onPressValue
                        });
                        this.iosMenu && this.iosMenu.hide()
                      }}/>

                    )}
                  </Menu>

                </View>
            ));
        }

        return (
            <View style={styles.rightElementContainer}>
                {content}
            </View>
        );
    }
    renderDivider = () => {
        const { divider } = this.props;

        if (!divider) {
            return null;
        }

        return <Divider />;
    }
    renderContent = (styles:ListItemStyle) => (
        <View style={styles.contentViewContainer} pointerEvents="box-none">
            {this.renderLeftElement(styles)}
            {this.renderCenterElement(styles)}
            {this.renderRightElement(styles)}
        </View>
    )
    render() {
        const { onPress, onLongPress } = this.props;

        const styles =this.getStyles();

        // renders left element, center element and right element
        let content = this.renderContent(styles);

        if (onPress || onLongPress) {
            content = (
                <RippleFeedback useTouchableWithoutFeedback delayPressIn={50} onPress={this.onListItemPressed} onLongPress={this.onListItemLongPressed} >
                    {content}
                </RippleFeedback>
            );
        }


        return (
            <View>
                <View style={styles.container}>
                    {content}
                </View>
                {this.renderDivider()}
            </View>
        );
    }
}
ListItem.defaultProps=defaultProps
export default ListItem;

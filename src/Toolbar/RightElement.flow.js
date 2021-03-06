/**
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet, NativeModules, findNodeHandle ,Text,Platform} from 'react-native'
import IconToggle from '../IconToggle'
import getTheme from '../styles/getTheme'
import Menu from '../Menu';
import type {IconPropTypes} from "../Icon/Icon.flow";
import {ViewPropTypes} from "../utils";
type MenuType={
  menu:{ labels:Array<string> | Array<{text:string,icon:IconPropTypes}>}
};
type Actions={
  actions:Array<IconPropTypes>
}
type RightElementProps = {
  rightElement?: IconPropTypes | React.Component<any> | Actions | MenuType | ()=>React.Component<*>,
  style: any,
  onPress: (any)=>void,
  rightElementStyle?:ViewPropTypes.style,
  rightElementContainerStyle?:ViewPropTypes.style,
}
const defaultProps = {
  rightElement: null,
  onRightElementPress: null,
  style: {},
}

function getStyles (props: RightElementProps) {
  const {toolbar} = getTheme()

  return {
    rightElementContainer: [
      toolbar.rightElementContainer,
      props.style.rightElementContainer,
      props.rightElementContainerStyle
    ],
    rightElement: [
      toolbar.rightElement,
      props.style.rightElement,
      props.rightElementStyle
    ],
  }
}

class RightElement extends PureComponent<RightElementProps> {

  props: RightElementProps
  static defaultProps: typeof defaultProps
  menu:typeof Menu
  render () {
    const {
      rightElement,
      onPress,
    } = this.props

    const styles = getStyles(this.props)

    // if there is no rightElement and searchable feature is off then we are sure on the right
    // is nothing
    if (!rightElement) {
      return null
    }

    let actionsMap = []
    let result = []

    if (rightElement) {

      if (Array.isArray(rightElement)) {
        actionsMap = rightElement
      } else if (rightElement && rightElement.actions) {
        actionsMap = rightElement.actions
      } else if (rightElement &&
        !React.isValidElement(rightElement) &&
        !rightElement.menu &&
        !(typeof rightElement === 'function')) {
        actionsMap = [rightElement]
      }
    }

    const flattenRightElement = StyleSheet.flatten(styles.rightElement)

    if (actionsMap) {
      result = (actionsMap:any).map((action, index) => {

        const {name,color,size,type}=(action:any)
        const iconToggleProps={
          name,
          size,
          type,
          color:color|| flattenRightElement.color,
        }

        return (
          <IconToggle
            key={name}
            {...iconToggleProps}
            style={flattenRightElement}
            onPress={() =>
              onPress && onPress({name, index})
            }
          />
        )
      })
    }

    if (React.isValidElement(rightElement)) {
      result.push(React.cloneElement((rightElement:any), {key: 'customRightElement'}))
    }
    if (typeof rightElement === 'function'){
      result.push(rightElement())
    }

    if (rightElement && rightElement.menu) {
      // We need this view as an anchor for drop down menu. findNodeHandle can
      // find just view with width and height, even it needs backgroundColor :/
      result.push((
        <View key="menuIcon">
          <View
            style={{
              backgroundColor: 'transparent',
              width: StyleSheet.hairlineWidth,
              height: StyleSheet.hairlineWidth,
            }}
          />
          <Menu ref={c=>this.menu=c}
                button={<IconToggle
                  name="more-vert"
                  color={flattenRightElement.color}
                  onPress={() =>this.menu && this.menu.show()}
                  style={flattenRightElement}
                />}>
            {(rightElement:any).menu.labels.map((label,index)=>{

              if(typeof label==='string'){
                return (
                  <Menu.Item key={index} text={label} onPress={()=>{
                    const {onPress}=this.props;
                    onPress && onPress({
                      action:'menu',
                      label,
                      index,
                    });
                    this.menu && this.menu.hide()
                  }}/>
                )
              }else{
                return <Menu.Item icon={{...label.icon}} key={index} text={label.text} onPress={()=>{
                  const {onPress}=this.props;
                  onPress && onPress({
                    action:'menu',
                    label:label.text,
                    index,
                  });
                  this.menu && this.menu.hide()
                }}/>
              }
            }
            )}
          </Menu>
        </View>
      ));
    }

    return (
      <View style={styles.rightElementContainer}>
        {result}
      </View>
    )
  }
}

RightElement.defaultProps = defaultProps
export default RightElement

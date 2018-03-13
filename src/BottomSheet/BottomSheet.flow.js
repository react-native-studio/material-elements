/**
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text ,TouchableWithoutFeedback} from 'react-native'
import { ViewPropTypes } from '../utils/index'
import getTheme from '../styles/getTheme'
import BSListItem from './BSListItem.flow'
import BSDivider from './BSDivider.flow'
import BSGridItem from './BSGridItem.flow'
import Modal from '../Modalbox/ModalBox'
import { MotionDuration, MotionCurve } from '../utils'

type StyleTypes = {
  container?: ViewPropTypes.style,
  listContent?: ViewPropTypes.style,
  gridContent?: ViewPropTypes.style,
  listTitleContainer?: ViewPropTypes.style,
  gridTitleContainer?: ViewPropTypes.style,
  title?: Text.propTypes.style,
}
type RenderType = 'grid' | 'list'
type BottomSheetProps = {
  /**
   * bottomsheet的title
   */
  title?: string,
  /**
   * bottonsheet是否可见
   */
  visible: boolean,
  /**
   * buttonsheet离开时触发
   */
  onClosed: () => void,
  /**
   * buttonsheet进入时触发
   */
  onOpened: () => void,

  renderType: RenderType,
  style: StyleTypes,
  children: mixed,
}
const defaultProps = {
  style: {},
}

class BottomSheet extends Component<BottomSheetProps> {

  props: BottomSheetProps
  static Divider: typeof BSDivider
  static ListItem: typeof BSListItem
  static defaultProps: typeof defaultProps
  static defaultProps = defaultProps
  static GridItem=typeof BSGridItem
  modal:typeof Modal
  getStyles = () => {
    const {bottomSheet} = getTheme()

    const {props} = this

    return {
      container: [
        bottomSheet.container,
        props.style.container,
      ],
      listContent: [
        bottomSheet.listContent,
        props.style.listContent,
      ],
      listTitleContainer: [
        bottomSheet.listTitleContainer,
        props.style.listTitleContainer,
      ],
      title: [
        bottomSheet.title,
        props.style.title,
      ],
      gridContent: [
        bottomSheet.gridContent,
        props.style.gridContent,
      ],
      gridTitleContainer: [
        bottomSheet.gridTitleContainer,
        props.style.gridTitleContainer,
      ]
    }
  }

  renderTitle (styles: StyleTypes) {

    const {title, renderType} = this.props

    let titleContainerStyle

    if (renderType === 'grid') {
      titleContainerStyle = styles.gridTitleContainer
    }

    if (renderType === 'list') {
      titleContainerStyle = styles.listTitleContainer
    }

    if (!title) {
      return null
    }
    return (
      <View style={titleContainerStyle}>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    )
  }

  renderContent = () => {

    const {renderType, title, children} = this.props

    const styles = this.getStyles()

    const attachStyles = title ? {paddingTop: 0} : {}
    let itemIndex=0;
    if (renderType === 'list') {
      return (
        <View style={[styles.listContent, attachStyles]}>
          {this.renderTitle(styles)}
          {children}
        </View>
      )
    } else if (renderType === 'grid') {

      return (
        <View style={[styles.gridContent, attachStyles]}>
          {this.renderTitle(styles)}
          {React.Children.map(children, (childrenNode, index) => {

            if(childrenNode.type.displayName==='BSDivider'){

              return childrenNode;
            }
            if(childrenNode.type.displayName==='BSGridItem'){
              itemIndex++;
              return React.cloneElement(
                childrenNode,
                {
                  itemIndex: itemIndex,
                  isHaveTitle: !!title
                }
              )
            }
            return null;
          })}
        </View>
      )
    }
  }

  render () {

    const styles = this.getStyles()

    const {visible, onOpened, onClosed} = this.props
    return (

      <Modal
        ref={modal=>this.modal=modal}
        isOpen={visible}
        coverScreen
        style={styles.container}
        backdrop={true}
        position={'bottom'}
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

BottomSheet.ListItem = BSListItem
BottomSheet.Divider = BSDivider
BottomSheet.GridItem=BSGridItem
export default BottomSheet

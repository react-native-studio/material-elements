/**
 * @providersModule DialogDefaultActions
 * @flow
 */
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Button from '../Button'
import getTheme from '../styles/getTheme'
import { ViewPropTypes } from '../utils/index'

type DialogDefaultActionsPropTypes = {
  actions: Array<string>,
  onActionPress: (string) => void,
  style:{
    defaultActionsContainer?:ViewPropTypes.style,
  }
}
const defaultProps = {
  style: {},
}

class DialogDefaultActions extends PureComponent<DialogDefaultActionsPropTypes> {

  props: DialogDefaultActionsPropTypes
  static defaultProps:typeof defaultProps
  onActionPressed:(string)=>void
  constructor (props:DialogDefaultActionsPropTypes) {
    super(props)

    this.onActionPressed = this.onActionPressed.bind(this)
  }

  getStyles = () => {
    let props = this.props
    const {dialog} = getTheme()

    return {
      defaultActionsContainer: [
        dialog.defaultActionsContainer,
        props.style.defaultActionsContainer,
      ],
    }
  }

  onActionPressed (action:string) {
    const {onActionPress} = this.props

    if (onActionPress) {
      onActionPress(action)
    }
  }

  render () {
    const {actions} = this.props

    const styles = this.getStyles()

    return (
      <View style={styles.defaultActionsContainer}>
        {actions.map(action => (
          <Button
            key={action}
            primary
            text={action}
            onPress={()=>this.onActionPressed(action)}
          />
        ))}
      </View>
    )
  }
}

DialogDefaultActions.defaultProps = defaultProps;

export default DialogDefaultActions;

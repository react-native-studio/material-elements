/**
 *@flow
 */
import React, {Component} from 'react'
import {
  Text,
  View,
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {ViewPropTypes} from "../../utils/index";
type ScrollVerticalPropTypes = {
  scrollHeight?: number,
  delay?: number,
  duration?: number,
  kbContainer?: ViewPropTypes.style,
  data?: Array<{ title: string }>,
  scrollStyle?: ViewPropTypes.style,
  textStyle?: Text.style,
  onItemPress?: ({ title: string }) => void,
  onChange: (number) => void,
  enableAnimation?:boolean

}
const defaultProps = {
  enableAnimation: true,
}
type ScrollVerticalState = {
  translateValue: Animated.Value,
  scrollHeight: number,
  delay: number,
  duration: number,
  enableAnimation: boolean,
  kb_tempValue: number,
  kb_contentOffsetY: number,
  kb_content: Array<{ title: string }>

}

class ScrollVertical extends Component<ScrollVerticalPropTypes, ScrollVerticalState> {
  props: ScrollVerticalPropTypes

  state: ScrollVerticalState
  static defaultProps: typeof defaultProps
  static defaultProps = defaultProps
  animation: any


  constructor(props: ScrollVerticalPropTypes) {
    super(props)
    let translateValue = new Animated.ValueXY({x: 0, y: 0})
    translateValue.addListener(({x, y}) => {
      // Log('value',x,y)
    })
    this.state = {
      translateValue: translateValue,
      // 滚屏高度
      scrollHeight: this.props.scrollHeight || 32,
      // 滚屏内容
      kb_content: [],
      // Animated.View 滚动到的 y轴坐标
      kb_tempValue: 0,
      // 最大偏移量
      kb_contentOffsetY: 0,
      // 每一次滚动切换之前延迟的时间
      delay: this.props.delay || 500,
      // 每一次滚动切换的持续时间
      duration: this.props.duration || 500,
      enableAnimation: true,
    }
  }

  render() {
    return (
      <View style={[styles.kbContainer, {height: this.state.scrollHeight}, this.props.kbContainer]}>
        {
          this.state.kb_content.length !== 0 ?
            <Animated.View
              style={[
                {flexDirection: 'column'},
                {
                  transform: [
                    {translateY: this.state.translateValue.y}
                  ]
                }
              ]}>
              {this.state.kb_content.map(this._createKbItem.bind(this))}
            </Animated.View> : null
        }
      </View>
    )
  }

  componentWillReceiveProps(nextProps: ScrollVerticalPropTypes) {

    this.setState({
        enableAnimation: nextProps.enableAnimation ? true : false
      }, () => {
        this.startAnimation();
      }
    )
  }

  componentDidMount() {
    let content = this.props.data || []
    if (content.length !== 0) {
      let h = (content.length + 1) * this.state.scrollHeight
      this.setState({
        kb_content: content.concat(content[0]),
        kb_contentOffsetY: h
      })

      // 开始动画
      // this._startAnimation()
      this.startAnimation();
    }
  }


  _createKbItem(kbItem, index) {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => this.props.onItemPress && this.props.onItemPress(kbItem)}>
        <View
          style={[{justifyContent: 'center', height: this.state.scrollHeight}, this.props.scrollStyle]}>
          <Text style={[styles.kb_text_c, this.props.textStyle]} numberOfLines={1}>{kbItem.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  startAnimation = () => {
    if (this.state.enableAnimation) {
      if (!this.animation) {
        this.animation = setTimeout(() => {
          this.animation = null;
          this._startAnimation();
        }, this.state.delay);
      }

    }

  }

  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
    if (this.state.translateValue) {
      this.state.translateValue.removeAllListeners();
    }
  }

  _startAnimation = () => {
    this.state.kb_tempValue -= this.state.scrollHeight;
    if (this.props.onChange) {
      let index = Math.abs(this.state.kb_tempValue) / (this.state.scrollHeight);
      this.props.onChange(index < this.state.kb_content.length - 1 ? index : 0);
    }
    Animated.sequence([

      // Animated.delay(this.state.delay),
      Animated.timing(
        this.state.translateValue,
        {
          isInteraction: false,
          toValue: {x: 0, y: this.state.kb_tempValue},
          duration: this.state.duration, // 动画持续的时间（单位是毫秒），默认为500
          easing: Easing.linear
        }
      ),
    ])
      .start(() => {
        // 无缝切换
        // Log('end')
        if (this.state.kb_tempValue - this.state.scrollHeight === -this.state.kb_contentOffsetY) {
          // 快速拉回到初始状态
          this.state.translateValue.setValue({x: 0, y: 0});
          this.state.kb_tempValue = 0;
        }
        this.startAnimation();


      })
  }
}

const styles = StyleSheet.create({
  kbContainer: {
    // 必须要有一个背景或者一个border，否则本身高度将不起作用
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  kb_text_c: {
    fontSize: 18,
    color: '#181818',
  }
})
export default ScrollVertical

import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight:(Platform.OS==='ios')?20:0,
  appBarHeight:(Platform.OS==='ios')?44:56,
}

export default metrics

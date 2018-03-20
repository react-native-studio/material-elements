import {
    View,
    BackHandler,
    ViewPropTypes as RNViewPropTypes,
    BackAndroid as DeprecatedBackAndroid,
    ImageBackground as RNImageBackground,
    Image
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
const BackAndroid = BackHandler || DeprecatedBackAndroid;
const ImageBackground = RNImageBackground || Image;
const MotionCurve=require('./MotionCurve');
const MotionDuration=require('./MotionDuration');

export {
    ViewPropTypes,
    BackAndroid,
    MotionCurve,
    MotionDuration,
    ImageBackground,
};

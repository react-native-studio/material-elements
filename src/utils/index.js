import {
    View,
    BackHandler,
    ViewPropTypes as RNViewPropTypes,
    BackAndroid as DeprecatedBackAndroid,
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
const BackAndroid = BackHandler || DeprecatedBackAndroid;
const MotionCurve=require('./MotionCurve');
const MotionDuration=require('./MotionDuration');

export {
    ViewPropTypes,
    BackAndroid,
    MotionCurve,
    MotionDuration,
};

/**
 * material - design 运动曲线
 *
 * https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
 */
import {Easing} from 'react-native';

/**
 * 标准曲线，
 * Elements quickly accelerate and slowly decelerate between on-screen locations. It applies to growing and shrinking material, among other property changes.
 * 适用于元素在屏幕位置之间的切换
 */
const standardCurve=Easing.bezier(0.4,0.0,0.2,1);

/**
 * 减速曲线
 *
 * 适用于元素以全速进入屏幕并缓慢减速至静止点
 */
const decelerationCurve=Easing.bezier(0.0,0.0,0.2,1);

/**
 * 加速曲线
 *
 * 适用于元素离开屏幕
 */
const accelerationCurve=Easing.bezier(0.4,0.0,1,1);

/**
 * 精锐曲线
 *
 * 适用于元素离开屏幕，可以随时返回到屏幕上的情况。
 */

const sharpCurve=Easing.bezier(0.4,0.0,0.6,1);//使用对应时间也应该是195ms
const MotionCurve={
  standardCurve,
  decelerationCurve,
  accelerationCurve,
  sharpCurve,
}
export default MotionCurve;

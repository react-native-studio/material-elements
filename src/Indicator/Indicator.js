/**
 * @providersModule Indicator
 * @flow
 */
import React,{Component} from 'react';
import MaterialIndicator from './material-indicator';
import BallIndicator from './ball-indicator';
import BarIndicator from './bar-indicator';
import DotIndicator from './dot-indicator';
import PulseIndicator from './pulse-indicator';
import PacmanIndicator from './pacman-indicator';
import SkypeIndicator from './skype-indicator';
import UIActivityIndicator from './ui-activity-indicator';
import WaveIndicator from "./wave-indicator/index";
class Indicator extends Component<*>{
  static Wave:typeof WaveIndicator
  static Ball:typeof BallIndicator
  static Bar:typeof BarIndicator
  static Dot:typeof DotIndicator
  static Pulse:typeof PulseIndicator
  static Material:typeof MaterialIndicator
  static Pacman:typeof PacmanIndicator
  static Skype:typeof SkypeIndicator
  static UIActivity:typeof UIActivityIndicator

  render(){
  return(<MaterialIndicator {...this.props}/>)
  }
}
Indicator.Wave=WaveIndicator;
Indicator.Ball=BallIndicator;
Indicator.Bar=BarIndicator;
Indicator.Dot=DotIndicator;
Indicator.Pulse=PulseIndicator;
Indicator.Material=MaterialIndicator;
Indicator.Pacman=PacmanIndicator;
Indicator.Skype=SkypeIndicator;
Indicator.UIActivity=UIActivityIndicator;
export default Indicator;

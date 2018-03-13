
import React,{Component} from 'react';
import MaterialIndicator from './material-indicator';
import WaveIndicator from './wave-indicator';
import BallIndicator from './ball-indicator';
import BarIndicator from './bar-indicator';
import DotIndicator from './dot-indicator';
import PulseIndicator from './pulse-indicator';
import PacmanIndicator from './pacman-indicator';
import SkypeIndicator from './skype-indicator';
import UIActivityIndicator from './ui-activity-indicator';
class Indicator extends Component{
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

/**
 * 此组件是基于rn-placeholder，
 * github地址  ：https://github.com/mfrachet/rn-placeholder
 * 详细使用请见：https://mfrachet.github.io/rn-placeholder/
 */
import Placeholder from 'rn-placeholder';
import Box from './Box';
import Line from './Line';
import Media from './Media';
import MultiWords from './MultiWords';
import ImageContent from './ImageContent';
import Paragraph from './Paragraph';
const connect=Placeholder.connect;
export default {
  Box,
  Line,
  ImageContent,
  Media,
  MultiWords,
  Paragraph,
  connect,
}

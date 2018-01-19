# Badge
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/badge-2.png" width="320">

### Usage

```js
...
import { Badge, Icon, Avatar } from 'material-elements';
...
render() {
  <Badge
            accent
            icon={{name:'star'}}
            text="120"
          >
            <Avatar text="BR" />
          </Badge>
}
```
### API
```js
const propTypes = {
    /**
     * badge
     */
    children: PropTypes.node,
    /**
     * badge内容
     */
    text: PropTypes.string,
    /**
     * badge里的icon内容
     */
    icon:PropTypes.shape({
      name:PropTypes.string,
      color:PropTypes.string,
      type:PropTypes.string,
      size:PropTypes.number,
    }),
    /**
     * badge container style={{ container: { width: size, height: size, borderRadius: size / 2 }}}
     */
    size: PropTypes.number,

    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
     /**
     * 整个node的尺寸
     */
    nodeSize:PropTypes.number,
};
};
```

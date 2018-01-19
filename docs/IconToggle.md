# IconToggle

### 使用

```js
...
import {IconToggle} from 'material-elements';
...
render(){
    return (
        <View>
       <IconToggle type={Icon.iconType.Ionicons} name="ios-arrow-back" size={24} color="red"/>
       <IconToggle name="arrow-back" size={24} color="red"/>
       </View>
    )
}
```
### API
```js
const propTypes = {
    /**
    * icon颜色
    */
    color: PropTypes.string,
    /**
    * icon按下的颜色
    */
    underlayColor: PropTypes.string,
    /**
    * 水波纹最大透明度
    */
    maxOpacity: PropTypes.number,
    /**
    * underlayColor的size
    */
    percent: PropTypes.number,
    /**
    * 是否可用
    */
    disabled: PropTypes.bool,
    /**
    * icon尺寸，默认24
    */
    size: PropTypes.number,
    /**
    * icon的name
    */
    name: PropTypes.string.isRequired,
    /**
    * It'll be used instead of icon (see props name) if exists
    */
    children: PropTypes.element,
    /**
    * 按下触发
    */
    onPress: PropTypes.func,
    /**
    * icon的类型
    */
    type:PropTypes.oneOf([
      Icon.iconType.Ionicons,
      Icon.iconType.MaterialCommunityIcons,
      Icon.iconType.MaterialIcons,
      Icon.FontAwesome,
    ])
};
```
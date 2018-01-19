# Icon
### 使用
```js
...
import {Icon} from 'material-elements';
...
render(){
    return (
        <View>
          <Icon type={Icon.iconType.Ionicons} name="ios-arrow-back" size={24}/>
          <Icon name="arrow-back"/>
        </View>
    )
}
```
### API

```js
const propTypes = {
    /**
     * icon的name
     */
    name: PropTypes.string.isRequired,
    /**
     * icon的style
     */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    /**
     * icon的尺寸
     */
    size: PropTypes.number,
    /**
     * icon的颜色
     */
    color: PropTypes.string,
    /**
     * icon的类型
     */
    type:PropTypes.string,
    }
    
type为如下：
const iconType={
    MaterialIcons:'MaterialIcons',
    FontAwesome:'FontAwesome',
    Ionicons:'Ionicons',
    MaterialCommunityIcons:'MaterialCommunityIcons'
}
可使用Icon.iconType.FontAwesome...获得
```
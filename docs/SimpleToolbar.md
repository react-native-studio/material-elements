# SimpleToolbar

### 使用
```js
...
import {SimpleToolbar} from 'material-elements'
...

render(){
    return (
        <View>
        <SimpleToolbar onLeftIconPress={()=>{}} title="主题"/>
</View>
    )
}

```

### API

```js
static propTypes = {
        title: PropTypes.string,
        leftIconName:PropTypes.string,
        rightIconName:PropTypes.string,
        onLeftIconPress:PropTypes.func,
        onRightIconPress:PropTypes.func,
    }
```
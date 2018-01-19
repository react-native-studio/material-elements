# [Card](https://material.io/guidelines/components/cards.html)

### Usage

```js
...
import { Card } from 'material-elements';
...
render() {
    <View>
      <Card>
        <Text>Hello world!</Text>
      </Card>
    </View>
}
```
### API
```js
const propTypes = {
    children: PropTypes.node,

    onPress: PropTypes.func,

    style: PropTypes.shape({
      container:ViewPropTypes.style,
    }),
  /**
   * 是否水平铺满
   */
  fullWidth:PropTypes.bool,
};
```

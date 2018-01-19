# [Button](https://material.google.com/components/buttons.html)

### 使用

```js
...
import { Button } from 'material-elements';
...
render() {
    <View>
        <Button primary text="Primary" /> // flat button with primary color
        <Button accent text="Accent" /> // flat button with accent color
        <Button raised primary text="Primary" /> // raised button with primary color
        <Button disabled text="Disabled" /> // disabled button
    </View>
}
```
### API
```js
const propTypes = {
    /**
        * button组件是否可用
        */
        disabled: PropTypes.bool,
        /**
        * button组件是否凸起
        */
        raised: PropTypes.bool,
        /**
        * 按下时触发，传递text参数
        */
        onPress: PropTypes.func,
        /**
        * 长按触发，传递text参数
        */
        onLongPress: PropTypes.func,
        /**
        * text将被显示
        */
        text: PropTypes.string.isRequired,
        /**
        * 是否转换大写
        */
        upperCase: PropTypes.bool,
        /**
        * 展示图标，展示在text之前
        */
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        /**
        * 重写button样式和text样式
        */
        style: PropTypes.shape({
            container: ViewPropTypes.style,
            text: Text.propTypes.style,
        }),
};
```

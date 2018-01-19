# Avatar

### Usage

```js
...
import { Avatar } from 'material-elements';
...
render() {
    <View>
        <Avatar text="A" />
                <Avatar icon={{name:'person',color:'blue'}}/>
                <Avatar icon={{name:'history',size:20}}/>
                <Avatar icon={{name:'mic'}} size={75} />
                <Avatar image={{source:require('../Images/launch-icon.png')}}/>
    </View>
}
```
### API
```js
const propTypes = {
    /**
    * 传入Image组件属性，avatar渲染Image
    */
    image: PropTypes.shape({
      ...Image.propTypes,
    }),
    /**
    * 传入Icon属性，avatar渲染icon
    */
    icon:PropTypes.shape({
      name:PropTypes.string,
      color:PropTypes.string,
      size:PropTypes.number,
      type:PropTypes.string,
    }),
    /**
    * 传入text，avatar渲染text组件
    */
    text: PropTypes.string,
    /**
    * 仅仅用于container尺寸: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
    /**
    * avatar样式
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        content: Text.propTypes.style,
    }),
};
```

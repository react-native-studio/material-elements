# Checkbox
![Imgur](http://i.imgur.com/eUUOXMv.jpg)

### Usage
```js
...
import { Checkbox } from 'material-elements'
...

render() {
    <View>
        <Checkbox disabled={true} checked={this.state.check} onCheck={()=>{
                    this.setState((preState)=>({check:!preState.check}))
                  }}/>
    </View>
}
```


### API
```js
 static propTypes= {
        /**
         * 是否选中
         */
        checked: PropTypes.bool,
        /**
         * checkbox是否有用
         */
        disabled: PropTypes.bool,
        /**
         * 当checked为false是展现的icon
         */
        uncheckedIcon:PropTypes.shape({
          name:PropTypes.string,
          size:PropTypes.number,
          color:PropTypes.string,
          type:PropTypes.string,
        }),
        /**
         * Event that is called when state is changed
         */
        onCheck: PropTypes.func.isRequired,
        /**
         * 当checked为true是展现的icon
        */
        checkedIcon:PropTypes.shape({
          name:PropTypes.string,
          size:PropTypes.number,
          color:PropTypes.string,
          type:PropTypes.string,
        })
    }
```

# BottomSheet

### 使用

```js
...
import {BottomSheet} from 'material-elements';
...

render(){
    return (
        <View>
        <BottomSheet itemDivider={3} listItems={[
                  {
                    icon:{name:'ios-arrow-back',type:Icon.iconType.Ionicons,},
                    text:'liming',
        
                  },
                  {
                    icon:{name:'arrow-back'},
                    text:'微信'
                  }
                ]}
                onClosed={()=>{
                  this.setState({isModalVisible:false})
                }} 
                visible={this.state.isModalVisible} 
                title="BottomSheet"/>
</View>
    )
}
```

###  API

```js
static propTypes={
    /**
     * bottomsheet的title
     */
    title:PropTypes.string,
    /**
     * bottonsheet是否可见
     */
    visible:PropTypes.bool,
    /**
     * buttonsheet离开时触发
     */
    onClosed:PropTypes.func,
    /**
     * buttonsheet进入时触发
     */
    onOpened:PropTypes.func,
    /**
     * 以list方式呈现
     */
    listItems:PropTypes.arrayOf(PropTypes.shape({
      icon:PropTypes.shape({
        name:PropTypes.string,
        type:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
      }),
      text:PropTypes.string,
    })),
    /**
     * 以grid方式呈现
     */
    gridItems:PropTypes.arrayOf(PropTypes.shape({
      icon:PropTypes.shape({
        name:PropTypes.string,
        type:PropTypes.string,
        color:PropTypes.string,
        size:PropTypes.number,
      }),
      text:PropTypes.string,
    })),
    /**
     * divider对应的item,从0开始,对于grid布局，暂且不支持divider
     */
    itemDivider:PropTypes.number,
    /**
     * item press时触发，传递{text,index}参数
     */
    onItemPress:PropTypes.func,
  }
```
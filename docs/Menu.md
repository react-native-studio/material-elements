# Menu

#### 使用

```js
...
import {Menu} from 'material-elements';
...
hideMenu = () => {
    this.menu.hide();
  };

showMenu = () => {
    this.menu.show();
  };
render(){
    return (
        <View>
        <Menu
                    ref={ref=>this.menu=ref}
                    button={
                      <IconToggle type="Ionicons" onPress={()=>this.showMenu()} name="md-more"/>
                    }>
                    <Menu.Item icon={{name:'arrow-back'}} text={'item1'} onPress={this.hideMenu}/>
                    <Menu.Item icon={{name:'arrow-back'}} text="item2" onPress={this.hideMenu}/>
                    <Menu.Item icon={{name:'arrow-back'}} text={'item3'} onPress={this.hideMenu} disabled/>
                    <Menu.Divider />
                    <Menu.Item icon={{name:'arrow-back'}} text={'item4'}  onPress={this.hideMenu}/>
                  </Menu>
</View>
    )
}

```

#### API

```js
Menu:
static propTypes = {
    /**
     * menu的button，点击button可弹出menu
     */
    button: PropTypes.node.isRequired,
    /**
     *应传入MenuItem 或 MenuDivider组件
     */
    children: PropTypes.node.isRequired,
    /**
     * 用户自定义的style
     */
    style:PropTypes.shape({
      container:ViewPropTypes.style
    })
  };



Menu.Item:
static propTypes={
    /**
     * item是否可用
     */
    disabled: PropTypes.bool,
    /**
     * disabled为true时text的颜色
     */
    disabledTextColor: PropTypes.string,
    /**
     * item 按下时触发
     */
    onPress: PropTypes.func,
    /**
     * item按下时的颜色，
     */
    underlayColor: TouchableHighlight.propTypes.underlayColor,
    /**
     * item中的text
     */
    text:PropTypes.string,
    /**
     * item中的icon
     */
    icon:PropTypes.shape({
      ...Icon.propTypes
    }),
    /**
     * 自定义的style
     */
    style:PropTypes.shape({
      container:ViewPropTypes.style,
      text:Text.propTypes.style,
      icon:PropTypes.object,
    })
  }
```
# Toast

#### 使用

```js
...
import {Toast} from 'material-elements';
...

showToast=()=>{
   this.toast && this.toast.show('message',Toast.SHORT)
}

render(){
    return (
        <View>
        <Toast ref={ref=>this.toast=ref}/>
</View>
    )
}

duration可取Toast.LONG或者Toast.SHORT
```
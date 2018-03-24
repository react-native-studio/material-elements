# **Avatar**


<img width="285" src="../images/avatar.png"/>

### 使用

```js
import { Avatar } from 'material-elements';

        <Avatar text="m"/>
        <Avatar text="m" size={60}/>
        <Avatar text="m" size={100}/>
        <Avatar icon={{name: 'menu'}}/>
        <Avatar icon={{name: 'menu'}} size={60}/>
        <Avatar icon={{name: 'menu'}} size={100}/>
        <Avatar image={{source: require('./Images/launch-icon.png')}}/>
        <Avatar image={{source: require('./Images/launch-icon.png')}} size={60}/>
        <Avatar image={{source: require('./Images/launch-icon.png')}} size={100}/>
```

### API

|属性|类型|默认值|说明|
|:---:|:---:|:---:|:---:|
|text|string|无|显示在Avatar中文字|
|icon|{name:string,size:number,type:string,color:string}|无|显示在avatar中的icon|
|image|Image.props|无|可设置所有Image属性|
|size|number|48|avatar的尺寸|
|style|{container:ViewPropTypes.style,content:Text.style}||content作用于Text组件|

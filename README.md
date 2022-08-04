# amap-utils

基于[高德地图JS-API](https://lbs.amap.com/api/jsapi-v2/guide/abc/load)二次封装的工具库

[![npm](https://img.shields.io/npm/v/@maybecode/amap-utils.svg)](https://www.npmjs.com/package/@maybecode/amap-utils)


## 快速开始

### 安装
```js
npm i @maybecode/amap-utils
```

### 使用

具体使用请查看[Demo](./examples/html/index.html)

```js
import AmapUtils from '@maybecode/amap-utils'

const amapUtils = new AmapUtils({
    key: "599dfe6bbe92b35d34d4e3d3f40aac6b",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
        'AMap.MouseTool',
        'AMap.PolygonEditor',
        'AMap.CircleEditor',
    ],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    "AMapUI": {             // 是否加载 AMapUI，缺省不加载
        "version": '1.1',   // AMapUI 版本
        "plugins": [
            'misc/PositionPicker' // 移动端拖拽选址
        ],       // 需要加载的 AMapUI ui插件
    },
});

console.log(amapUtils)

const init = async () => {
    // 容器 <div id="map"></div>
    const map = await amapUtils.initMap('map', {
        center: [116.397428, 39.90923],
        // zooms: [4, 18],//设置地图级别范围
        zoom: 13
    });

}

init()

```


## License

[MIT](./README.md)
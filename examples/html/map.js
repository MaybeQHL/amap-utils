import AmapUtils from './dist/index.es.js'

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


const editors = {
    Polygon: null,
    Circle: null
}


const init = async () => {
    const map = await amapUtils.initMap('map', {
        center: [116.397428, 39.90923],
        // zooms: [4, 18],//设置地图级别范围
        zoom: 13
    });


    // 初始化渲染
    const defaultRender = () => {
        const vec = amapUtils.createVector('polygon', {
            path: [
                [116.403322, 39.920255],
                [116.410703, 39.897555],
                [116.402292, 39.892353],
                [116.389846, 39.891365]
            ],
        })
        editors.polygon = amapUtils.createVectorEditor('Polygon', vec)
    }
    defaultRender();

    let com;
    const getSelectVal = () => {
        const selects = document.querySelector('#selects')
        return selects.options[selects.selectedIndex].value
    }
    document.querySelector('#draw').addEventListener('click', async () => {

        const type = getSelectVal()
        if (editors[type]) return;
        const mouseTool = amapUtils.mouseTool();

        // 画具体图形
        mouseTool[type]();
        // 监听绘制完成事件
        mouseTool.on('draw', (e) => {
            const type = getSelectVal()
            console.log(e)
            const obj = e.obj;

            if (type == 'polygon') {
                let check = AmapUtils.isTruePolygon(obj);
                console.log('验证多边形合法结果：', check)

                editors.polygon = amapUtils.createVectorEditor('polygon', e.obj);
                editors.polygon.on('end', (e) => {
                    console.log('多边形编辑器结果', e)
                })
            }
            if (type == 'circle') {
                editors.circle = amapUtils.createVectorEditor('circle', obj);
                editors.circle.on('end', (e) => {
                    console.log('圆形编辑器结果', e)
                })
            }
            mouseTool.close()
        })

    })

    document.querySelector('#save').addEventListener('click', () => {
        Object.keys(editors).forEach(key => {
            let type = getSelectVal()
            if (editors[key]) {
                // 获取组件对象
                const target = editors[key].getTarget();
                if (type == 'polygon') {
                    const check = AmapUtils.isTruePolygon(target);
                    const msg = `验证多边形合法结果${check}`
                    console.log(msg)
                    alert(msg)
                    check && editors[key].close()
                } else {
                    editors[key].close()
                }

            }
        })
    })

    document.querySelector('#edit').addEventListener('click', () => {
        Object.keys(editors).forEach(key => {
            let type = getSelectVal()
            if (editors[key]) {
                editors[key].open()
            }
        })
    })

    document.querySelector('#clear').addEventListener('click', () => {
        map.clearMap();
        Object.keys(editors).forEach(key => {
            editors[key] && editors[key].close()
            editors[key] = null;
        })
    })


}

init()




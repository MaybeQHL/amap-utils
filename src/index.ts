/**
 * amap-utils
 * 高德地图工具库
 * @author maybe
 */
import * as AMapLoader from '@amap/amap-jsapi-loader';
import { isTruePolygon } from './geometric'
import { mergeConfig, wrapPromise } from './utils';


declare global {
    interface Window {
        AMap: any;
        AMapUI: any;
    }
}

enum VectorTypes {
    Polygon = "Polygon", Polyline = "Polyline", Circle = "Circle",
    BezierCurve = "BezierCurve", Ellipse = 'Ellipse', Rectangle = 'Rectangle'
};

class AmapUtils {

    map: any;
    AMap: any;
    AMapUI: any;
    config: any;
    mobile: boolean;

    /**
     * @param config 插件配置
     */
    constructor(config: any) {
        if (!config) {
            this.error('请传入初始化配置!')
        }
        this.config = config;
    }

    error(msg: string) {
        console.error(`[AmapUtils Error]:${msg}`)
    }

    /**
     * 异步加载插件
     * @param plugins 
     * @returns 
     */
    loadPlugins(plugins: any[]) {
        return new Promise((res, rej) => {
            this.AMap.plugin(plugins, function () {
                res(null)
            });
        })
    }
    /**
     * 兼容运行
     * @param pcFunc 
     * @param mobileFunc 
     */
    run(pcFunc, mobileFunc) {
        return this.mobile ? mobileFunc() : pcFunc();
    }

    /**
     * 初始化地图
     * @param id 容器id
     * @param config 配置
     * @returns 
     */
    initMap(id: string, config: any) {
        return new Promise((reslove, reject) => {
            AMapLoader.load(this.config).then((AMap) => {
                window.AMap = AMap;
                this.AMapUI = window.AMapUI;
                this.AMap = AMap;
                this.map = new AMap.Map(id, config);

                // 检测运行平台是否为移动端设备
                this.mobile = this.AMap.Browser.mobile;
                console.log(`当前运行终端设备为${this.mobile ? '移动端' : 'PC端'}`)
                this.map.setFitView()
                reslove(this.map)
            }).catch(e => {
                console.log(e);
                reject(e)
            })
        })
    }

    /**
     * 添加组件到地图
     * @param com 组件对象组
     * @param autoFit 自动缩放地图到合适的视野级别
     */
    addToMap(coms: any[], autoFit = true) {
        // 将多边形添加到地图
        this.map.add(coms)
        // 缩放地图到合适的视野级别
        autoFit && this.map.setFitView()
    }

    /**
     * 鼠标工具
     * @returns 
     */
    mouseTool() {
        return new this.AMap.MouseTool(this.map);
    }

    /**
     * 删除覆盖物/图层。参数为单个覆盖物/图层，或覆盖物/图层的数组
     * @desc 参数说明：
    features ((Overlay | Layer | Array<(Overlay | Layer)>)) 覆盖物对象或者数组
     */
    remove(features) {
        return this.map.remove(features)
    }

    /**
     * 创建矢量图编辑器
     * @param type 类型 例: polygon
     * @param com 组件对象 例: Polygon对象 同高德Editor方法
     * @param opts 额外配置 同高德Editor方法
     * @returns 
     */
    createVectorEditor(type: VectorTypes, com: any, opts: any) {
        let editor;

        type = type[0].toUpperCase() + type.substring(1) + 'Editor' as any;

        editor = new this.AMap[type](this.map, com, opts)
        return editor;
    }

    /**
     * 创建矢量图形
     * @param type 类型
     * @param opts 配置
     * @param intomap 渲染在地图中 默认true
     * @returns 
     */
    createVector(type: VectorTypes, opts: any, intomap = true) {
        let vec;
        let baseOpts = {
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff'
        }
        // 合并配置
        opts = mergeConfig(baseOpts, opts)

        type = type[0].toUpperCase() + type.substring(1) as any;

        vec = new this.AMap[`${type}`](opts)
        if (intomap) {
            this.addToMap(vec, true)
        }
        return vec;
    }

    /**
     * 判断坐标组成的单个多边形是否合法
     * @param {*} com 
     * @description 请传入组件对象obj或者[[1,2],[2,2],[3,3]] 类似的二维数组 
     * @returns {boolean}
     */
    static isTruePolygon(target: [][] | any) {
        if (!target) return false;
        if (!Array.isArray(target)) {
            target = this.getPath(target)
        }
        return isTruePolygon(target);
    }


    /**
     * 坐标结构转换[{lng:'',lat:''}] => [[lng,lat]]
     */
    static objArrToArr(paths) {
        return paths.map(item => [item.lng, item.lat]);
    }

    /**
     * 根据组件object获取二维数组[[111,99]] 
     * @param obj 
     * @returns 
     */
    static getPath(obj) {
        return this.objArrToArr(obj.getPath())
    }
}


export default AmapUtils
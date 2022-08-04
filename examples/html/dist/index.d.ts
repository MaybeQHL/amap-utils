declare global {
    interface Window {
        AMap: any;
        AMapUI: any;
    }
}
declare enum VectorTypes {
    Polygon = "Polygon",
    Polyline = "Polyline",
    Circle = "Circle",
    BezierCurve = "BezierCurve",
    Ellipse = "Ellipse",
    Rectangle = "Rectangle"
}
declare class AmapUtils {
    map: any;
    AMap: any;
    AMapUI: any;
    config: any;
    mobile: boolean;
    /**
     * @param config 插件配置
     */
    constructor(config: any);
    error(msg: string): void;
    /**
     * 异步加载插件
     * @param plugins
     * @returns
     */
    loadPlugins(plugins: any[]): Promise<unknown>;
    /**
     * 兼容运行
     * @param pcFunc
     * @param mobileFunc
     */
    run(pcFunc: any, mobileFunc: any): any;
    /**
     * 初始化地图
     * @param id 容器id
     * @param config 配置
     * @returns
     */
    initMap(id: string, config: any): Promise<unknown>;
    /**
     * 添加组件到地图
     * @param com 组件对象组
     * @param autoFit 自动缩放地图到合适的视野级别
     */
    addToMap(coms: any[], autoFit?: boolean): void;
    /**
     * 鼠标工具
     * @returns
     */
    mouseTool(): any;
    /**
     * 删除覆盖物/图层。参数为单个覆盖物/图层，或覆盖物/图层的数组
     * @desc 参数说明：
    features ((Overlay | Layer | Array<(Overlay | Layer)>)) 覆盖物对象或者数组
     */
    remove(features: any): any;
    /**
     * 创建矢量图编辑器
     * @param type 类型 例: polygon
     * @param com 组件对象 例: Polygon对象 同高德Editor方法
     * @param opts 额外配置 同高德Editor方法
     * @returns
     */
    createVectorEditor(type: VectorTypes, com: any, opts: any): any;
    /**
     * 创建矢量图形
     * @param type 类型
     * @param opts 配置
     * @param intomap 渲染在地图中 默认true
     * @returns
     */
    createVector(type: VectorTypes, opts: any, intomap?: boolean): any;
    /**
     * 判断坐标组成的单个多边形是否合法
     * @param {*} com
     * @description 请传入组件对象obj或者[[1,2],[2,2],[3,3]] 类似的二维数组
     * @returns {boolean}
     */
    static isTruePolygon(target: [][] | any): boolean;
    /**
     * 坐标结构转换[{lng:'',lat:''}] => [[lng,lat]]
     */
    static objArrToArr(paths: any): any;
    /**
     * 根据组件object获取二维数组[[111,99]]
     * @param obj
     * @returns
     */
    static getPath(obj: any): any;
}
export default AmapUtils;

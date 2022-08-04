/**
 * 坐标转线段
 * @param {*} path
 * @returns {arr}
 */
export declare function pathToLines(path: any): any[];
/**
 * 判断坐标组成的单个多边形是否合法
 * @param {*} path
 * @description 请传入[[1,2],[2,2],[3,3]] 类似的二维数组
 * @returns {boolean}
 */
export declare function isTruePolygon(path: any): boolean;
declare const _default: {
    pathToLines: typeof pathToLines;
    isTruePolygon: typeof isTruePolygon;
};
export default _default;

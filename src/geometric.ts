
/**
 * 几何工具库
 */
import { lineString } from "@turf/helpers"
import lineIntersect from "@turf/line-intersect"
/**
 * 坐标转线段
 * @param {*} path 
 * @returns {arr}
 */
export function pathToLines(path) {
  const lines = [];
  path.forEach((p, pi) => {
    let line;
    if (pi == path.length - 1) {
      line = lineString([path[pi], path[0]]);
      lines.push(line)
      return;
    }
    line = lineString([path[pi], path[pi + 1]]);
    lines.push(line)
  })
  // console.log(JSON.stringify(lines))
  return lines;
}
/**
 * 判断坐标组成的单个多边形是否合法
 * @param {*} path 
 * @description 请传入[[1,2],[2,2],[3,3]] 类似的二维数组 
 * @returns {boolean}
 */
export function isTruePolygon(path) {
  //  判断数组且数组的长度小于3不构成满足一个面的必要条件终止
  if (!Array.isArray(path) || path.length < 3) {
    console.error(`[isTruePolygon]: 请传入一个二维数组且至少包含3个点的坐标`)
    return false
  };
  //  具体坐标也需是一个一维数组，并且数组的长度等于2
  if (!path.every(item => Array.isArray(item) && item.length == 2)) return false;

  // 将坐标转成线段
  const lines = pathToLines(path);
  // 是否合法标志
  let isTrue = true;
  // 验证函数
  function check() {
    // 倒序循环
    for (let i = lines.length - 1; i >= 0; i--) {
      // 基准线段
      const line1 = lines[i];
      // 依次判断
      for (let j = i - 1; j >= 0; j--) {
        const line2 = lines[j];
        // 判断是否相交
        const lt = lineIntersect(line1, line2)
        // console.log(JSON.stringify(lt.features.length > 0 ? '相交' : '不相交'))
        // 如果是相邻的一根线段,判断是否有交点且交点是否在端点上,如果是最后一根线段为基准线段那么和第一根线段也将相邻在端点才合法
        if (j == i - 1 || (i == lines.length - 1 && j == 0)) {
          // 判断交点是否在端点上
          const coordinates = line1.geometry.coordinates;
          const ltCoordinates = lt.features.length > 0 && lt.features[0].geometry.coordinates
          const isEndpoint = coordinates.find(p => p[0] == ltCoordinates[0] && p[1] == ltCoordinates[1]);
          // console.log(lt.features[0].geometry.coordinates);
          if (!isEndpoint) {
            isTrue = false;
            // console.log('相邻线段非端点不合法')
            return;
          } else {
            // console.log('相邻线段合法')
          }
        } else {
          if (lt.features.length > 0) {
            isTrue = false;
            // console.log('非相邻线段相交不合法')
            return;
          } else {
            // console.log('非相邻线段合法')
          }
        }
      }
    }
  }
  check();
  isTrue ? console.info('多边形合法') : console.log("多边形不合法")
  return isTrue;
}
export default {
  pathToLines,
  isTruePolygon,
}
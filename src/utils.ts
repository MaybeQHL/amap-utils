export const wrapPromise = (resloveFunc: Function, rejectFunc?: Function) => {
    return new Promise((reslove, reject) => {
        try {
            reslove(resloveFunc())
        } catch (error) {
            reject(rejectFunc ? rejectFunc(error) : error)
        }
    })
}



export const mergeConfig = (oldConf, newConf) => {
    // 合并配置
    return Object.assign(oldConf, newConf)
}
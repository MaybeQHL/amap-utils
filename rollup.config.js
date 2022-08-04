import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete'
// import serve from 'rollup-plugin-serve'

const isDev = process.env.NODE_ENV == 'dev'


export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'umd',
            name: 'AmapUtils',
            file: 'dist/index.umd.js'
        },
        {
            format: 'es',
            file: 'dist/index.es.js'
        },
        {
            format: 'cjs',
            file: 'dist/index.cjs.js'
        }
    ],

    plugins: [
        del({ targets: 'dist/*' }),
        nodeResolve(),
        typescript(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
    ]
}

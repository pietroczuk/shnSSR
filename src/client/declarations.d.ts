declare module '*.png'
declare module '*.scss'
declare module '*.svg' {
    const content: string
    export default content
}

declare module 'isomorphic-style-loader/withStyles';
declare module 'isomorphic-style-loader/StyleContext';
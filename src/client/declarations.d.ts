// declare module '*.png'
// declare module '*.svg' {
//     const content: string
//     export default content
// }
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module 'isomorphic-style-loader/withStyles';
declare module 'isomorphic-style-loader/StyleContext';
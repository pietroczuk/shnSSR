// declare module '*.scss' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

// isomorfic style loader | withstyles

interface Styles {
  [key: string]: string;
}

declare module 'isomorphic-style-loader/withStyles' {
  function withStyles(
    ...styles: Styles[]
  ): <P, S>(
      component: React.FunctionComponent<P> | React.ComponentClass<P, S>,
    ) => React.FunctionComponent<P> | React.ComponentClass<P, S>;

  export = withStyles;
}

declare module '*.less' {
  const value: Styles;

  export = value;
}

declare module '*.css' {
  const value: Styles;

  export = value;
}
declare module '*.scss' {
  const value: Styles;

  export = value;
}
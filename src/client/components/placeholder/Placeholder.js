import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './placeholder.scss';

const Placeholder = ({ customWidth, customHeight }) => {
    const width = customWidth ? customWidth : '100%';
    const height = customHeight ? customHeight + 'px' : 'auto';
    return <div className={styles.animatedPlaceholder} style={{ width: width, height: height }}>&nbsp;</div>;
}
export default withStyles(styles)(Placeholder);
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './fixedBar.scss';

const FixedBar = () => {
    return <div className={styles.fixedBar}>fixed bar</div>;
}
export default withStyles(styles)(FixedBar);
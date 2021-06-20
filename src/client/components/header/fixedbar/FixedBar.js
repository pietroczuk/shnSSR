import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './fixed.modules.scss';

const FixedBar = () => {
    return <div className={styles.fixedBar}>jakies tam napisy</div>;
}
export default withStyles(styles)(FixedBar);
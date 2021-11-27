import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './assitiveText.scss';

const AssitiveText = props => {
    return <div className={styles.assitiveText}>{props.children}</div>;
}
export default withStyles(styles)(AssitiveText);
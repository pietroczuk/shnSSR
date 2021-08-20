import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './footer.modules.scss';

const Footer = () => {
    return <div className={styles.footer}>stopka</div>;
}
export default withStyles(styles)(Footer);
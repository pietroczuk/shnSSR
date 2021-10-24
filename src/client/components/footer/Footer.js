import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './footer.modules.scss';

const Footer = () => {
    return <footer className={styles.footer}>stopka</footer>;
}
export default withStyles(styles)(Footer);
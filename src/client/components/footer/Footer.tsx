import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './footer.scss';

const Footer: React.FC = () => {
    return <footer className={styles.footer}>stopka</footer>;
}
export default withStyles(styles)(Footer);
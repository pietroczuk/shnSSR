import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './footer.scss';

const Footer: FC = () => {
    return <footer className={styles.footer}>stopka</footer>;
}
export default withStyles(styles)(Footer);
import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './fixedBar.scss';

const FixedBar: FC = (props) => {
    return <div className={styles.fixedBar}>{props.children}</div>;
}
export default withStyles(styles)(FixedBar);
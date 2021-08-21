import React from 'react';
import styles from '../contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

const MainContent = props => {
    return <div className={styles.main_column}
        ref={props.main_ref}
    >
        {props.children}
    </div>
}
export default withStyles(styles)(MainContent);
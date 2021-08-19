import React from 'react';
import styles from './contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';


const ContentCointainer = props => {
    const { miltirow } = props;
    return (
        <div className={`${styles.page_container} ${miltirow ? styles.multirow : ''}`}>
            {props.children}

        </div>
    )
}
export default withStyles(styles)(ContentCointainer);
import React from 'react';
import styles from './contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ContenerContextProvider } from './contenerContext/contenerContext';

const ContentCointainer = props => {
    const { miltirow } = props;
    return (
        <ContenerContextProvider>
            <div className={`${styles.page_container} ${miltirow ? styles.multirow : ''}`}>
                {props.children}
            </div>
        </ContenerContextProvider>
    )
}
export default withStyles(styles)(ContentCointainer);
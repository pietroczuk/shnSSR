import React from 'react';
import styles from './contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ContenerContextProvider } from './contenerContext/contenerContext';

const ContentCointainer = props => {
    const { miltirow } = props;
    return (
        <ContenerContextProvider>
            <main className={`${styles.page_container} ${miltirow ? styles.multirow : ''}`}>
                {props.children}
            </main>
        </ContenerContextProvider>
    )
}
export default withStyles(styles)(ContentCointainer);
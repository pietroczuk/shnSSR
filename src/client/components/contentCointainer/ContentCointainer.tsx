import React from 'react';
import styles from './contentCointainer.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ContenerContextProvider } from './contenerContext/contenerContext';

interface ContentCointainerProps {
    isMultirow: boolean
}

const ContentCointainer: React.FC<ContentCointainerProps> = props => {
    const { isMultirow } = props;
    return (
        <ContenerContextProvider>
            <main className={`${styles.page_container} ${isMultirow ? styles.multirow : ''}`}>
                {props.children}
            </main>
        </ContenerContextProvider>
    )
}
export default withStyles(styles)(ContentCointainer);
import { FC } from 'react';
import styles from './contentCointainer.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ContenerContextProvider } from './contenerContext/contenerContext';

const ContentCointainer: FC<{ miltirow: boolean }> = props => {
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
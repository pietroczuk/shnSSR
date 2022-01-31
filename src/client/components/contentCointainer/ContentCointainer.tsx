import { FC } from 'react';
import styles from './contentCointainer.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ContenerContextProvider } from './contenerContext/contenerContext';

interface ContentCointainerProps {
    miltirow: boolean
}

const ContentCointainer: FC<ContentCointainerProps> = props => {
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
import React, { useState } from 'react';
import styles from './contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import ContenerContext from './contenerContext/contenerContext';

const ContentCointainer = props => {
    const { miltirow } = props;
    const [mainRef, setMainRef] = useState(null);
    const setMainRefHandler = reference => {
        setMainRef(reference);
    }
    return (
        <div className={`${styles.page_container} ${miltirow ? styles.multirow : ''}`}>
            <ContenerContext.Provider value={{ mainContentRef: mainRef, setMainContentRef: setMainRefHandler }}>
                {props.children}
            </ContenerContext.Provider>
        </div>
    )
}
export default withStyles(styles)(ContentCointainer);
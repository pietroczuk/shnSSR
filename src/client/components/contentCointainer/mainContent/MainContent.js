import React, { useContext, useRef, useEffect } from 'react';
import styles from '../contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ContenerContext from '../contenerContext/contenerContext';

const MainContent = props => {
    const contenerContext = useContext(ContenerContext);
    const main_ref = useRef();
    useEffect(()=>{
        contenerContext.setMainContentRef(main_ref);

        return () => {
            contenerContext.setMainContentRef(null);
        }
    },[main_ref])
    return <article className={styles.main_column} ref={main_ref}>
        {props.children}
    </article>
}
export default withStyles(styles)(MainContent);
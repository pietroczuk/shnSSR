import React, { useContext, useRef, useEffect } from 'react';
import styles from '../contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ContenerContext from '../contenerContext/contenerContext';

const MainContent = props => {
    const contenerContext = useContext(ContenerContext);
    const main_ref = useRef();
    useEffect(()=>{
        contenerContext.setMainContentRef(main_ref);
    },[main_ref])
    return <div className={styles.main_column} ref={main_ref}>
        {props.children}
    </div>
}
export default withStyles(styles)(MainContent);
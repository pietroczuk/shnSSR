import React, { useEffect } from 'react';
import styles from './notFoundPage.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../client';

const NotFoundPage: React.FC<{staticContext: any}> = ({ staticContext = {} }) => {
    const ssr = useSelector((state: RootState) => state.PublicConfig.ssr, shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    // useEffect(()=>{
    //     console.log('404');
    // },[]);
    // useStyles(s);
    staticContext.notFound = true;
    return (
        <div className={styles.notfound}>404</div>
    )
}

// export default {
//     component:  NotFoundPage
// }

// export default {
//     component:  withStyles(styles)(NotFoundPage)
// }

export default withStyles(styles)(NotFoundPage);

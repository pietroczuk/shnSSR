import React, {useEffect} from 'react';
import styles from './notFoundPage.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { publicConfigActions } from '../../redux/slices/publicConfigSlice';
import { useSelector, shallowEqual } from 'react-redux';

const NotFoundPage = ({ staticContext = {} }) => {
    const ssr = useSelector(state => state.PublicConfig.ssr, shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    },[])

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

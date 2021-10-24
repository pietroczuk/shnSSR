import React from 'react';
// import s from '../styles/404.css';
import styles from './404.module.scss';

// import useStyles from 'isomorphic-style-loader/useStyles';
import withStyles from 'isomorphic-style-loader/withStyles';

const NotFoundPage = ({ staticContext = {} }) => {
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

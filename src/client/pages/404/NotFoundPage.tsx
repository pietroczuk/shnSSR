import { FC, useEffect } from 'react';
import styles from './notFoundPage.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../client';

interface NotFoundPageProps {
    staticContext: any;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ staticContext = {} }) => {
    const ssr = useSelector((state: RootState) => state.PublicConfig.ssr, shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    staticContext.notFound = true;
    return (
        <div className={styles.notfound}>404</div>
    )
}

export default withStyles(styles)(NotFoundPage);

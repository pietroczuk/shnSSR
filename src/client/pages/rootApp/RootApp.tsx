import { FC, Fragment, useEffect } from 'react';
import {
    renderRoutes,
    RouteConfig
} from 'react-router-config';
import { useSelector, shallowEqual, 
    // useDispatch 
} from 'react-redux';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';

import loadable from '@loadable/component';
import { RootState } from '../../client';
import Timer from '../../components/timer/Timer';
// import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';

const Header = loadable(() => import(/* webpackPrefetch: true */ '../../components/header/Header'),
    {
        ssr: true,
        // fallback: <span className="loading-state">ssr: true - Loading...</span>
    });
const Footer = loadable(() => import(/* webpackPrefetch: true */ '../../components/footer/Footer'), {});

interface RootAppProps {
    route: { routes: RouteConfig[] }
}

const RootApp: FC<RootAppProps> = (props) => {
    const { route } = props;
    const { language, cookieLanguageKey, 
        // ssr 
    } = useSelector((state: RootState) => ({
        language: state.User.language,
        cookieLanguageKey: state.SystemConfig.cookiesKeys.userLanguage,
        // ssr: state.PublicConfig.ssr
    }), shallowEqual);

    // const dispatch = useDispatch();
    
    useEffect(() => {
        const cookieUserLanguage = getCookie(cookieLanguageKey);
        const coockieLanguageNeedChange = language && (language !== cookieUserLanguage);
        coockieLanguageNeedChange && setCookie(cookieLanguageKey, language);
        // ssr && dispatch(publicConfigActions.disableSrr());
    }, []);

    return (
        <Fragment>
            {/* {console.log('root app render', route, props)} */}
            <Timer />
            <Header isWhiteTopbar={true} isDarkBackground={false} />
            {renderRoutes(route.routes)}
            <Footer />
        </Fragment>
    );
};
export default withStyles(styles)(RootApp);
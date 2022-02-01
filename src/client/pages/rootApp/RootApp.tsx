import React, { FC, useEffect } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { useSelector, shallowEqual } from 'react-redux';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';

import loadable from '@loadable/component';
import { RootState } from '../../client';

const Header = loadable(() => import(/* webpackPrefetch: true */ '../../components/header/Header'),
    {
        ssr: true,
        // fallback: <span className="loading-state">ssr: true - Loading...</span>
    });
const Footer = loadable(() => import(/* webpackPrefetch: true */ '../../components/footer/Footer'), {});

interface Props {
    route: { routes: RouteConfig[] }
}

const RootApp: FC<Props> = ({ route }) => {
    const { language, cookieLanguageKey } = useSelector((state: RootState) => ({
        language: state.User.language,
        cookieLanguageKey: state.SystemConfig.cookiesKeys.userLanguage,
    }), shallowEqual);

    useEffect(() => {
        const cookieUserLanguage = getCookie(cookieLanguageKey);
        const coockieLanguageNeedChange = language && (language !== cookieUserLanguage);
        coockieLanguageNeedChange && setCookie(cookieLanguageKey, language);
    }, [])
    return (
        <React.Fragment>
            <Header isWhiteTopbar={true} />
            {renderRoutes(route.routes)}
            <Footer />
        </React.Fragment>
    );
};
export default withStyles(styles)(RootApp);
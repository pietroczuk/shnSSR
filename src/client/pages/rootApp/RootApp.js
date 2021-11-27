import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import {useSelector, shallowEqual} from 'react-redux';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';

import loadable from '@loadable/component';

const Header = loadable(() => import(/* webpackPrefetch: true */ '../../components/header/Header'),
    {
        ssr: true,
        // fallback: <span className="loading-state">ssr: true - Loading...</span>
    });
const Footer = loadable(() => import(/* webpackPrefetch: true */ '../../components/footer/Footer'), {});


const RootApp = ({ route }) => {
    const { language, cookieLanguageKey } = useSelector(
        state => ({
            language: state.User.language,
            cookieLanguageKey: state.SystemConfig.cookies_keys.user_language,
        }), shallowEqual
    )
    useEffect(() => {
        const cookieLang = getCookie(cookieLanguageKey);
        language && (language !== cookieLang) && setCookie(cookieLanguageKey, language);
    }, [])
    return (
        <React.Fragment>
            {console.log('render app')}
            <Header white={true} whiteTopbar={true} />
            {renderRoutes(route.routes)}
            <Footer />
        </React.Fragment>
    );
};
export default withStyles(styles)(RootApp);
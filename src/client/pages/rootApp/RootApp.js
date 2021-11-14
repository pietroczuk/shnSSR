import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useSelector, useDispatch } from 'react-redux';
// import { getGlobalConfig } from '../../redux/actions/actionCreators';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';
// actions
import { checkWishlist } from '../../redux/actions/actionCreators';
// components
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';

import loadable from '@loadable/component';

const Header = loadable(() => import(/* webpackPrefetch: true */ '../../components/header/Header'),
    {
        ssr: true,
        // fallback: <span className="loading-state">ssr: true - Loading...</span>
    });
const Footer = loadable(() => import(/* webpackPrefetch: true */ '../../components/footer/Footer'), {});


const RootApp = ({ route, location }) => {
    const {api, language, currency, cookieLanguageKey, cookieCurrencyKey, initLocalstorageWishlistKey } = useSelector(
        state => ({
            api: state.SystemConfig.api,
            language: state.User.language,
            currency: state.User.currency,
            cookieLanguageKey: state.SystemConfig.cookies_keys.user_language,
            cookieCurrencyKey: state.SystemConfig.cookies_keys.user_currency,
            initLocalstorageWishlistKey: state.SystemConfig.localstorage_keys.wishlist,
        })
    )
    const dispatch = useDispatch();

    useEffect(() => {
        const cookieLang = getCookie(cookieLanguageKey);
        language && (language !== cookieLang) && setCookie(cookieLanguageKey, language);

        const cookieCurr = getCookie(cookieCurrencyKey);
        currency && (currency !== cookieCurr) && setCookie(cookieCurrencyKey, currency);
        dispatch(checkWishlist(initLocalstorageWishlistKey, null, api, language));
    }, [])
    return (
        <React.Fragment>
            <Header white={true} whiteTopbar={true} language={language} location={location} />
            {renderRoutes(route.routes)}
            <Footer />
        </React.Fragment>
    );
};
export default withStyles(styles)(RootApp);
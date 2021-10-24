import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useSelector } from 'react-redux';
import { getGlobalConfig } from '../../redux/actions/actionCreators';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.module.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';
// components
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';

import loadable from '@loadable/component';

const Header = loadable(() => import(/* webpackPrefetch: true */ '../../components/header/Header'),
    {
        ssr: true,
        // fallback: <span className="loading-state">ssr: true - Loading...</span>
    });
const Footer = loadable(() => import(/* webpackPrefetch: true */ '../../components/footer/Footer'),{});


const RootApp = ({ route, location }) => {
    const { language, currency } = useSelector(
        state => ({
            language: state.User.language,
            currency: state.User.currency,
        })
    )

    useEffect(() => {
        !getCookie('language') && language && setCookie('language', language);
        !getCookie('currency') && currency && setCookie('currency', currency);
    }, [])
    return (
        <React.Fragment>
            <Header white={true} whiteTopbar={true} language={language} location={location} />
            {renderRoutes(route.routes)}
            <Footer />
        </React.Fragment>
    );
};

const loadDataOnInit = (server_store, api_config, language) => {
    // console.log('serverstore1', server_store.getState());
    const my_promise = server_store.dispatch(getGlobalConfig(api_config, language));
    // console.log('serverstore2', my_promise);
    // console.log('serverstore3', server_store.getState());
    return my_promise;
}

export default {
    loadDataOnInit: loadDataOnInit,
    component: withStyles(styles)(RootApp)
};
import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { get_global_config } from '../../redux/actions/all_actions';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './rootapp.module.scss';

import { setCookie, getCookie } from '../../utils/utilsFrondend';
// components
import Header from '../../components/header/Header';

// import loadable from '@loadable/component';

// const Header2 = loadable(() => import('../../components/header/Header'),
//     {
//         ssr: true,
//         fallback: <span className="loading-state">ssr: true - Loading...</span>
//     });


const RootApp = ({ route, language , currency, location}) => {
    useEffect(()=> {
        !getCookie('language') && language && setCookie('language', language);
        !getCookie('currency') && currency && setCookie('currency', currency);
    },[])
    return (
        <React.Fragment>
            <Header white={true} whiteTopbar={true} language={language} location={location} />
            {renderRoutes(route.routes)}
            <div>stopka</div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    config: state.config,
    language: state.user.language,
    currency: state.user.currency,
});

const loadDataOnInit = (server_store, api_config, language) => {
    const my_promise = server_store.dispatch(get_global_config(api_config, language));

    return my_promise;
}

export default {
    loadDataOnInit: loadDataOnInit,
    component:
        connect(mapStateToProps, { get_global_config })
            (withStyles(styles)(RootApp))
};
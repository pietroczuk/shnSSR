import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.module.scss';

import { connect } from 'react-redux';
import { get_page, clear_page } from '../../redux/actions/all_actions';
import { pageTypes, metatags, prepareSearchCode } from '../../utils/utilsFrondend';


const StaticPage = props => {

    // from redux
    const { seo, staticpage, api, url_prefix } = props;
    const seo_title = staticpage ? staticpage.seo_title : null;
    const seo_description = staticpage ? staticpage.seo_description : null;
    // redux function
    const { get_page, clear_page } = props;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;

    useEffect(() => {
        if (!staticpage) get_page(api, pageTypes.staticPage, lang, url, prepareSearchCode(location.search));
        return clear_page;
    }, [])

    return (
        <div>
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            <h1>static page</h1>
            <div>
                {staticpage && staticpage.page_body.h2.text}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    seo: state.global.config.seo,
    staticpage: state.page.page,
    url_prefix: state.config.urls[pageTypes.staticPage],
});

const loadDataOnInit = (server_store, api_config, language, url, query) => {
    const my_promise = server_store.dispatch(
        get_page(api_config.api, pageTypes.staticPage, language, url, query)
    );
    return my_promise;
}

export default {
    loadDataOnInit: loadDataOnInit,
    component:
        connect(mapStateToProps, {
            get_page,
            clear_page,
        })
            (withStyles(styles)(StaticPage))
}
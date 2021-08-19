import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.module.scss';

import { connect } from 'react-redux';
import { get_page, clear_page } from '../../redux/actions/all_actions';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';

const StaticPage = props => {

    // from redux
    const { seo, staticpage, api, url_prefix, type } = props;
    const seo_title = staticpage ? staticpage.seo_title : null;
    const seo_description = staticpage ? staticpage.seo_description : null;
    // redux function
    const { get_page, clear_page } = props;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    const setCurrentLocationHandler = loc => {
        if (currentLocation !== loc) {
            setCurrentLocation(loc);
        }
    }

    useEffect(() => {
        if (!staticpage || currentLocation !== location.pathname || type !== pageTypes.staticPage) {
            get_page(api, pageTypes.staticPage, lang, url, prepareSearchCode(location.search));
            setCurrentLocationHandler(location.pathname);
            scrollToTop(window);
        }
        return clear_page;
    }, [location.pathname]);

    return (
        <div>
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            {staticpage ? <h1>{staticpage.title}</h1> : <h1><Placeholder /></h1>}
            <div>
                {staticpage && renderHtmlFromJson(staticpage.body)}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    seo: state.global.config.seo,
    staticpage: state.page.data,
    type: state.page.type,
    url_prefix: state.config.urls[pageTypes.staticPage],
    api: state.config.api,
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
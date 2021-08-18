import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.modules.scss';

import { connect } from 'react-redux';
import { get_page, clear_page } from '../../redux/actions/all_actions';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';

const Category = props => {

    // from redux
    const { seo, category, api, url_prefix, type } = props;
    const seo_title = category ? category.seo_title : null;
    const seo_description = category ? category.seo_description : null;
    // redux function
    const { get_page, clear_page } = props;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;
    
    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    const setCurrentLocationHandler = loc => {
        if(currentLocation !== loc) {
            setCurrentLocation(loc);
        }
    }
    useEffect(() => {
        if (!category || currentLocation!==location.pathname || type !== pageTypes.categoryPage) {
            get_page(api, pageTypes.categoryPage, lang, url, prepareSearchCode(location.search));
            setCurrentLocationHandler(location.pathname);
        }   
        return clear_page;
    }, [location.pathname]);


    return (
        <div>
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            { category ? <h1>{category.title}</h1> : <h1><Placeholder /></h1>}
            <div>
            { category ? <div>{category.description}</div> : <div><Placeholder /></div>}
                {/* {staticpage && renderHtmlFromJson(staticpage.page_body)} */}
                siemka
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    seo: state.global.config.seo,
    category: state.page.data,
    type: state.page.type,
    url_prefix: state.config.urls[pageTypes.categoryPage],
    api: state.config.api
});

const loadDataOnInit = (server_store, api_config, language, url, query) => {
    const my_promise = server_store.dispatch(
        get_page(api_config.api, pageTypes.categoryPage, language, url, query)
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
            (withStyles(styles)(Category))
}
import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';

const StaticPage = props => {
    // from redux
    const { seo, staticpage, type, url_prefix, api } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            staticpage: state.Page.data,
            type: state.Page.type,
            url_prefix: state.SystemConfig.urls[pageTypes.staticPage],
            api: state.SystemConfig.api,
        })
    );
    const dispatch = useDispatch();
    // seo
    const seo_title = staticpage ? staticpage.seo_title : null;
    const seo_description = staticpage ? staticpage.seo_description : null;
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
            dispatch(getPage(api, pageTypes.staticPage, lang, url, prepareSearchCode(location.search)));
            setCurrentLocationHandler(location.pathname);
            scrollToTop(window);
        }
        return () => dispatch(pageActions.clearPageData());
    }, [location.pathname, dispatch]);

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

export default withStyles(styles)(StaticPage);
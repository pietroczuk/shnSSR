import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';

const StaticPage = props => {
    // ssr
    // const [ssr, setSrr] = useState(true);
    // const setSrrHandler = val => {
    //     ssr !== val && setSrr(val);
    // }
    // from redux
    const { seo, staticpage, url_prefix, api, language, ssr } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            ssr: state.PublicConfig.ssr,
            staticpage: state.Page.data,
            url_prefix: state.SystemConfig.urls[pageTypes.staticPage],
            api: state.SystemConfig.api,
            language: state.User.language
        }), shallowEqual
    );
    const dispatch = useDispatch();
    // seo
    const seo_title = staticpage ? staticpage.seo_title : null;
    const seo_description = staticpage ? staticpage.seo_description : null;
    // from props
    const { url } = props.match.params;
    const { location } = props;
    // useEffect(() => {
    // }, []);
    useEffect(() => {
        // setSrrHandler(false);
        const axiosAbortController = new AbortController();
        // console.log('page ssr:' ,ssr);
        !ssr && dispatch(getPage(api, pageTypes.staticPage, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            return dispatch(pageActions.clearPageData());
        }
    },[location.pathname]);

    return (
        <div>
            {console.log('render page')}
            {metatags(seo_title, seo_description, seo, url, language, url_prefix)}
            {staticpage ? <h1>{staticpage.title}</h1> : <h1><Placeholder /></h1>}
            <div>
                {staticpage && renderHtmlFromJson(staticpage.body)}
            </div>
        </div>
    )
}

export default withStyles(styles)(StaticPage);
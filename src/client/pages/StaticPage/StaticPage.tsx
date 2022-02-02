import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import Placeholder from '../../components/placeholder/Placeholder';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';

interface StaticPageProps {
    url: string;
}

const StaticPage: React.FC<RouteComponentProps<StaticPageProps>> = props => {

    const { body, api, language, ssr, title } = useSelector(
        (state: RootState) => ({
            ssr: state.PublicConfig.ssr,
            title: state.Page.info.title,
            body: state.Page.data.staticPage.body,
            api: state.SystemConfig.api,
            language: state.User.language
        }), shallowEqual
    );
    const dispatch = useDispatch();

    const { url } = props.match.params;
    const { location } = props;

    const pageType = pageTypes.staticPage;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageType, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
        }
    }, [location.pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    const showPageBody = !!body;
    return (
        <div>
            {<SeoMetaTags url={url} language={language} pageType={pageType}/>}
            <h1>{title ? title : <Placeholder />}</h1>
            <div>
                {showPageBody && renderHtmlFromJson(body)}
            </div>
        </div>
    )
}

export default withStyles(styles)(StaticPage);
import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';

const StaticPage: FC<RouteComponentProps<{ url: string }>> = props => {
    // from redux
    const { seo, staticpage, url_prefix, api, language, ssr } = useSelector(
        (state: RootState) => ({
            seo: state.PublicConfig.config.seo,
            ssr: state.PublicConfig.ssr,
            staticpage: state.Page.data,
            url_prefix: state.SystemConfig.pageTypePrefixUrls[pageTypes.staticPage],
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

    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageTypes.staticPage, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
            // return dispatch(pageActions.clearPageData());
        }
    }, [location.pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    return (
        <div>
            {console.log('render page')}
            {metatags(seo_title, seo_description, seo, url, language, url_prefix)}
            {staticpage ? <h1>{staticpage.title}</h1> : <h1><Placeholder /></h1>}
            <div>
                {staticpage && staticpage.body && renderHtmlFromJson(staticpage.body)}
            </div>
        </div>
    )
}

export default withStyles(styles)(StaticPage);
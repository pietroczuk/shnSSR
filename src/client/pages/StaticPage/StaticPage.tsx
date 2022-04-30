import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './staticpage.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, ParamsModel, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import { RootState } from '../../client';
import { useLocation, useParams } from 'react-router-dom';
import Placeholder from '../../components/placeholder/Placeholder';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { getPage } from '../../redux/actionCreators/page/page.ac';


const StaticPage: FC = () => {

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

    const { url } = useParams<ParamsModel>();
    const { pathname, search } = useLocation();

    const pageType = pageTypes.staticPage;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageType, language, url, prepareSearchCode(search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
        }
    }, [pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    const showPageBody = !!body;
    return (
        <div>
            {<SeoMetaTags url={url} language={language} pageType={pageType} />}
            <h1>{title ? title : <Placeholder />}</h1>
            <div>
                {showPageBody && renderHtmlFromJson(body)}
            </div>
        </div>
    )
}

export default withStyles(styles)(StaticPage);
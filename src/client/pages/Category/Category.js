import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.modules.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice'; 
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';


const Category = props => {

    // from redux
    const { seo, category, api, url_prefix, type } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            category: state.Page.data,
            type: state.Page.type,
            url_prefix: state.SystemConfig.urls[pageTypes.categoryPage],
            api: state.SystemConfig.api,
        })
    )
    const dispatch = useDispatch();
    // seo
    const seo_title = category ? category.seo_title : null;
    const seo_description = category ? category.seo_description : null;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;
    // multirow
    const multirow = true;
    // dev - images
    const { images_url } = useSelector(state => ({ images_url: state.SystemConfig.images }));

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    const setCurrentLocationHandler = loc => {
        if (currentLocation !== loc) {
            setCurrentLocation(loc);
        }
    }
    useEffect(() => {
        if (!category || currentLocation !== location.pathname || type !== pageTypes.categoryPage) {
            dispatch(getPage(api, pageTypes.categoryPage, lang, url, prepareSearchCode(location.search)));
            setCurrentLocationHandler(location.pathname);
            scrollToTop(window);
        }
        return () => dispatch(pageActions.clearPageData());
    }, [location.pathname, dispatch]);

    const showProducts = products => {
        if (products) {
            return products.map(p =>
                <li key={p.id}>
                    {p.title}
                    <img width="300px" height="400px" alt={p.title} src={images_url.url + '/' + p.variations[Object.keys(p.variations)[0]].variation_image.poster + images_url.medium} />
                </li>
            )
        }
        return <li>loading...</li>
    }

    return (
        <ContentCointainer miltirow={multirow}>
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            {
                multirow && <StickySidebar location={location}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }
            <MainContent>
                {category ? <h1>{category.title}</h1> : <h1><Placeholder /></h1>}
                <div>
                    {category ? <div>{category.description}</div> : <div><Placeholder /></div>}

                    {category && <ul>{showProducts(category.products)}</ul>}
                    {/* {staticpage && renderHtmlFromJson(staticpage.page_body)} */}
                </div>
            </MainContent>
            {/* <StickySidebar>dupa</StickySidebar> */}
        </ContentCointainer>
    )
}

export default withStyles(styles)(Category);
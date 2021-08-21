import React, { useEffect, useState, useRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.modules.scss';
import stylesGlobal from '../../components/contentCointainer/contentCointainer.modules.scss';

import { connect } from 'react-redux';
import { get_page, clear_page } from '../../redux/actions/all_actions';
import { pageTypes, metatags, prepareSearchCode, renderHtmlFromJson, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';


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
    // ref for main content
    const main_ref = useRef();
    // multirow
    const multirow = true;

    // dev - images
    const { images_url } = props;

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    const setCurrentLocationHandler = loc => {
        if (currentLocation !== loc) {
            setCurrentLocation(loc);
        }
    }
    useEffect(() => {
        if (!category || currentLocation !== location.pathname || type !== pageTypes.categoryPage) {
            get_page(api, pageTypes.categoryPage, lang, url, prepareSearchCode(location.search));
            setCurrentLocationHandler(location.pathname);
            scrollToTop(window);
        }
        return clear_page;
    }, [location.pathname]);

    const show_products = products => {
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
                multirow && <StickySidebar location={location} main_ref={main_ref}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }
            <MainContent main_ref={main_ref}>
                {category ? <h1>{category.title}</h1> : <h1><Placeholder /></h1>}
                <div>
                    {category ? <div>{category.description}</div> : <div><Placeholder /></div>}

                    {category && <ul>{show_products(category.products)}</ul>}
                    {/* {staticpage && renderHtmlFromJson(staticpage.page_body)} */}
                </div>
            </MainContent>
            <StickySidebar>dupa</StickySidebar>
        </ContentCointainer>
    )
}
const mapStateToProps = state => ({
    seo: state.global.config.seo,
    category: state.page.data,
    type: state.page.type,
    url_prefix: state.config.urls[pageTypes.categoryPage],
    api: state.config.api,
    // dev
    images_url: state.config.images,
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
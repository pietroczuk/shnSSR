import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice';
import {
    pageTypes, metatags, prepareSearchCode,
    renderHtmlFromJson,
    scrollToTop
} from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
import ProductItem from '../../components/productItem/ProductItem';
import FixedBar from '../../components/fixedbar/FixedBar';
import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';
import RandomColorSwicher from '../../components/helpers/ui/randomColorSwicher/RandomColorSwicher';

import LoadingSpinner from '../../components/helpers/ui/loadingSpinner/LoadingSpinner';
import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';

import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';

const Category = props => {
    //ssr
    // const [ssr, setSrr] = useState(true);

    // from redux
    const {
        seo,
        ssr,
        category,
        api,
        url_prefix,
        category_products,
        // showVisual,
        // showRandom,
        // cookiesDisplayKeys,
        language,
        default_variant_code
    } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            ssr: state.PublicConfig.ssr,
            category: state.Page.data,
            url_prefix: state.SystemConfig.urls[pageTypes.categoryPage],
            api: state.SystemConfig.api,
            category_products: state.SystemConfig.placeholder.category_products,
            // showVisual: state.Display.showVisual,
            // showRandom: state.Display.showRandom,
            // cookiesDisplayKeys: state.SystemConfig.cookies_keys.display,
            language: state.User.language,
            default_variant_code: state.PublicConfig.default_variant_code
        })
        ,shallowEqual
    )
    const dispatch = useDispatch();
    // seo
    const seo_title = category ? category.seo_title : null;
    const seo_description = category ? category.seo_description : null;
    // from props
    const { url } = props.match.params;
    const { location } = props;
    // multirow
    const multirow = true;
    const title = category ? category.title : null;
    const badgeNumber = null;
    // useEffect(() => {
    //     setSrr(false);
    // }, [location.pathname]);

    useEffect(() => {
        const axiosAbortController = new AbortController();
        console.log('category ssr:' ,ssr);
        !ssr && dispatch(getPage(api, pageTypes.categoryPage, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            return dispatch(pageActions.clearPageData());
        }
    }, [location.pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    },[])

    const showProducts = category => {
        const products = category && category.products ? category.products : null;
        if (products) {
            return products.map((p, index) => <ProductItem product={p} key={p.id} index={index} />);
        }
        return [...Array(category_products)].map((el, index) => <ProductItem key={index} />);
    }
    return (
        <ContentCointainer miltirow={multirow}>
            {metatags(seo_title, seo_description, seo, url, language, url_prefix)}
            {
                multirow && <StickySidebar location={location}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }
            <MainContent>
                <ShowTitleWithBadge title={title} badgeNumber={badgeNumber} customWidth={20} />
                <div>
                    <FixedBar>
                        <ImageSwicher/>
                        <RandomColorSwicher/>
                        <AllFeaturesDisplay currentVariationCode={default_variant_code} allProductVariation={null} wishlistAvaible={true} displayInline={true}/>
                    </FixedBar>
                    <div className={styles.productsGrid}>{showProducts(category)}</div>
                    <div className={styles.categroryLoadMore}><LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={2} /></div>
                    {category ? <div className={styles.categoryDescription} >{renderHtmlFromJson(category.description)}</div> : <div><Placeholder /></div>}
                </div>
            </MainContent>
            {/* <StickySidebar>dupa</StickySidebar> */}
        </ContentCointainer>
    )
}

export default withStyles(styles)(Category);
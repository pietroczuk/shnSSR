import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice';
import { pageTypes, metatags, prepareSearchCode, 
    renderHtmlFromJson, 
    scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
import ProductItem from '../../components/productItem/ProductItem';
import FixedBar from '../../components/fixedbar/FixedBar';
// import NiceSwicher from '../../components/ui/niceSwitcher/NiceSwicher';
import ImageSwicher from '../../components/ui/imageSwicher/ImageSwicher';
import RandomColorSwicher from '../../components/ui/randomColorSwicher/RandomColorSwicher';

import LoadingSpinner from '../../components/ui/loadingSpinner/LoadingSpinner';

const Category = props => {

    // from redux
    const { seo, category, api, url_prefix, type, category_products, showVisual, showRandom } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            category: state.Page.data,
            type: state.Page.type,
            url_prefix: state.SystemConfig.urls[pageTypes.categoryPage],
            api: state.SystemConfig.api,
            category_products: state.SystemConfig.placeholder.category_products,
            showVisual: state.Display.showVisual,
            showRandom: state.Display.showRandom
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

    const showProducts = category => {
        const products = category && category.products ? category.products : null;
        if (products) {
            return products.map((p, index) => <ProductItem product={p} key={p.id} index={index}/>);
        }
        return [...Array(category_products)].map((el, index) => <ProductItem key={index} />);
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
                <h1 className={styles.categoryName}>
                    {category ? category.title : <Placeholder customWidth={'20%'} />}
                </h1>
                <div>
                    <FixedBar>
                        <ImageSwicher showVisual={showVisual}/>
                        <RandomColorSwicher showRandom={showRandom} />
                    </FixedBar>
                    <div className={styles.productsGrid}>{showProducts(category)}</div>
                    <div className={styles.categroryLoadMore}><LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={2}/></div>
                    {category ? <div className={styles.categoryDescription} >{renderHtmlFromJson(category.description)}</div> : <div><Placeholder /></div>}
                </div>
            </MainContent>
            {/* <StickySidebar>dupa</StickySidebar> */}
        </ContentCointainer>
    )
}

export default withStyles(styles)(Category);
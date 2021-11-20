import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './wishlist.scss';

import { useSelector, useDispatch } from 'react-redux';
// import { getPage , serpa } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice';
import {
    pageTypes, 
    metatags, 
    // prepareSearchCode,
    // renderHtmlFromJson,
    // scrollToTop
} from '../../utils/utilsFrondend';

// import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
import ProductItem from '../../components/productItem/ProductItem';
import FixedBar from '../../components/fixedbar/FixedBar';
import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';
// import RandomColorSwicher from '../../components/ui/randomColorSwicher/RandomColorSwicher';

// import LoadingSpinner from '../../components/ui/loadingSpinner/LoadingSpinner';

import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';

const Wishlist = props => {
    const { title, Wishlist, seo, language, showVisual, cookiesDisplayKeys, wishlistMultiUrl } = useSelector(state => ({
        title: state.PublicConfig.translation.wishlist,
        Wishlist: state.Wishlist,
        seo: state.PublicConfig.config.seo,
        language: state.User.language,
        showVisual: state.Display.showVisual,
        cookiesDisplayKeys: state.SystemConfig.cookies_keys.display,
        wishlistMultiUrl: state.SystemConfig.special_pages_urls[pageTypes.wishlist]
    })
    );
    const { location } = props;
    const { url } = props.match.params;
    const multirow = true;
    const badgeNumber = Wishlist.length;

    const dispatch = useDispatch();
    useEffect(() => {
        const wishlistPageObj = {
            data: {
                url: wishlistMultiUrl,
                type: pageTypes.specialPage
            }
        }
        dispatch(pageActions.setPageData({ data: wishlistPageObj }));
        return () => {
            return dispatch(pageActions.clearPageData());
        }
    },[]);

    const showProducts = wishlistData => {
        const products = wishlistData && wishlistData.products ? wishlistData.products : null;
        if (products) {
            return (Object.entries(products).map(
                ([key, val]) => {
                    return <ProductItem product={val.productData} key={val.v} imagesInRootVariant={true} wishlistPage={true}/>
                })
            );
        }
    }
    return (
        <ContentCointainer miltirow={multirow}>
            {metatags(null, null, seo, url, language, null)}
            {
                multirow && <StickySidebar location={location}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }
            <MainContent>
                <ShowTitleWithBadge title={title} badgeNumber={badgeNumber} customWidth={20} />
                <div>
                    <FixedBar>
                        <ImageSwicher showVisual={showVisual} cookieKey={cookiesDisplayKeys.visual_mode} />
                        {/* <RandomColorSwicher showRandom={showRandom} cookieKey={cookiesDisplayKeys.random_variant} /> */}
                    </FixedBar>
                    <div className={styles.productsGrid}>{showProducts(Wishlist)}</div>
                    {/* <div className={styles.categroryLoadMore}><LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={2} /></div> */}
                    {/* {category ? <div className={styles.categoryDescription} >{renderHtmlFromJson(category.description)}</div> : <div><Placeholder /></div>} */}

                    <div><h2>Ostatnio ogladane</h2></div>
                </div>
            </MainContent>
            {/* <StickySidebar>dupa</StickySidebar> */}
        </ContentCointainer>
    )
}

export default withStyles(styles)(Wishlist);
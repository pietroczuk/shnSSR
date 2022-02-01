import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './wishlist.scss';

import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes } from '../../utils/utilsFrondend';

import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
import ProductItem from '../../components/productItem/ProductItem';
import FixedBar from '../../components/fixedbar/FixedBar';
import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';

import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';
import { RootState } from '../../client';
import { Wishlist as WishlistType } from '../../redux/types/wishlist.types';
import { RouteComponentProps } from 'react-router-dom';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';

interface WishlistProps {
    url: string;
}

const Wishlist: React.FC<RouteComponentProps<WishlistProps>> = props => {
    const pageType = pageTypes.wishlist;

    const { title, wishlist, language, wishlistMultilanguageUrls, ssr } = useSelector((state: RootState) => ({
        title: state.PublicConfig.translations.wishlist,
        wishlist: state.Wishlist,
        language: state.User.language,
        wishlistMultilanguageUrls: state.SystemConfig.specialPagesUrlsArray[pageType],
        ssr: state.PublicConfig.ssr,
    })
    );
    const { location } = props;
    const { url } = props.match.params;
    const isMultirow = true;
    const badgeNumber = wishlist.length;

    const dispatch = useDispatch();
    useEffect(() => {
        const wishlistPageObj = {
            data: {
                url: wishlistMultilanguageUrls,
                type: pageTypes.specialPage
            }
        }
        !ssr && dispatch(pageActions.setPageData({ data: wishlistPageObj }));
        return () => {
            dispatch(pageActions.clearPageData());
        }
    }, []);

    useEffect(() => {
        // We need disable ssr for special pages
        // because we dont get any data from Api
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    const showProducts = (wishlistData: WishlistType) => {
        const products = wishlistData && wishlistData.products ? wishlistData.products : null;
        if (products) {
            return (Object.entries(products).map(
                ([_key, val]) => {
                    return <ProductItem
                        product={val.productData}
                        key={val.v}
                        imagesInRootVariant={true}
                        wishlistPage={true}
                        wishlistVariantId={val.v}
                    />
                })
            );
        }
        return null
    }
 

    return (
        <ContentCointainer isMultirow={isMultirow}>
            {<SeoMetaTags url={url} language={language} pageType={pageType}/>}

            {isMultirow &&
                <StickySidebar location={location}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }

            <MainContent>
                <ShowTitleWithBadge title={title} badgeNumber={badgeNumber} customWidth={20} />
                <div>
                    <FixedBar>
                        <ImageSwicher />
                    </FixedBar>
                    <div className={styles.productsGrid}>{showProducts(wishlist)}</div>
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
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
import FixedBar from '../../components/fixedbar/FixedBar';
import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';

import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import ProductsWishlistGrid from '../../components/productsGrid/productsWishlistGrid/productsWishlistGrid';

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
                    <ProductsWishlistGrid/>
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
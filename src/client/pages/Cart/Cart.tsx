import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './cart.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, ParamsModel } from '../../utils/utilsFrondend';

import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
// import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
// import FixedBar from '../../components/fixedbar/FixedBar';
// import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';

import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';
import { RootState } from '../../client';
import { useParams } from 'react-router-dom';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
// import ProductsWishlistGrid from '../../components/productsGrid/productsWishlistGrid/productsWishlistGrid';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';


const Cart: FC = () => {
    const pageType = pageTypes.cart;

    const { cartLabel, cart, language, cartMultilanguageUrls, ssr } = useSelector((state: RootState) => ({
        cartLabel: state.PublicConfig.translations.cartLabel,
        cart: state.Cart,
        language: state.User.language,
        cartMultilanguageUrls: state.SystemConfig.specialPagesUrlsArray[pageType],
        ssr: state.PublicConfig.ssr,
    }), shallowEqual
    );

    const { url } = useParams<ParamsModel>();


    const isMultirow = true;
    const badgeNumber = cart.length;

    const dispatch = useDispatch();
    useEffect(() => {
        const cartPageObj = {
            info: {
                url: cartMultilanguageUrls,
                type: pageTypes.specialPage
            }
        }
        !ssr && dispatch(pageActions.setPageData({ data: cartPageObj }));
        return () => {
            dispatch(pageActions.clearPageData());
        }
    }, []);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    return (
        <ContentCointainer isMultirow={isMultirow}>
            {<SeoMetaTags url={url} language={language} pageType={pageType} />}

            <MainContent>
                <ShowTitleWithBadge title={cartLabel} badgeNumber={badgeNumber} customWidth={20} />
                <div>
                    {/* <FixedBar>
                        <ImageSwicher />
                    </FixedBar> */}
                    {/* <ProductsWishlistGrid/> */}

                    {/* <div><h2>Ostatnio ogladane</h2></div> */}
                    <p>tutaj koszyk</p>
                    <br />
                    ------------------
                    <br />
                    jesli lista zyczen nie jest pusta
                    <br />
                    wywietlamy info:<br />
                    --------- nie zapomnij o produktach z twojej listy zyczen<br />
                    - jak produkt jest w koszyku, dajemy info ze jest w koszyku<br />
                    - moze dac ktory rozmiar jest w koszyku<br />
                </div>
            </MainContent>
            {isMultirow &&
                <StickySidebar>
                    {/* <LeftMenuLinks location={location} /> */}
                    info o dostawie
                </StickySidebar>
            }
        </ContentCointainer>
    )
}

export default withStyles(styles)(Cart);
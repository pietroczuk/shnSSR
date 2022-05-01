import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, prepareSearchCode, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { getPage } from '../../redux/actionCreators/page/page.ac';
// SEO
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { helmetJsonLdProp } from "react-schemaorg";
import { Product as HelmetProduct } from "schema-dts";
import BlackButton from '../../components/helpers/ui/blackButton/BlackButton';
import ImageSlider from '../../components/imageSlider/ImageSlider';
import { addToStoreCart } from '../../redux/actionCreators/cart/cart.ac';
import AddToWishlistSticker from '../../components/helpers/ui/addToWishlistSticker/AddToWishlistSticker';

interface ProductProps {
    url: string;
    lang: string;
}

const Product: FC<RouteComponentProps<ProductProps>> = (props) => {
    const pageType = pageTypes.productPage;
    const { product, api,
        // images_url, 
        allCurrencies, currency, language, ssr, title, addToCart, cartProducts, productId, lang, localstorageCartKey } = useSelector(
            (state: RootState) => ({
                product: state.Page.data.productPage,
                api: state.SystemConfig.api,
                // images_url: state.SystemConfig.images,
                allCurrencies: state.SystemConfig.allCurrencies,
                currency: state.User.currency,
                language: state.User.language,
                ssr: state.PublicConfig.ssr,
                title: state.Page.info.title,
                addToCart: state.PublicConfig.translations.addToCart,
                cartProducts: state.Cart.products,
                productId: state.Page.info.id,
                lang: state.User.language,
                localstorageCartKey: state.SystemConfig.localstorageKeys.cart,
            }), shallowEqual
        )
    const dispatch = useDispatch();

    const variantId = product ? product.currentVariationId : null;
    const variations = product ? product.variations : null;
    // const likes = product ? product.likes : null;
    // from props
    const { url,
        // lang 
    } = props.match.params;
    const { location } = props;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageType, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
        }

    }, [location.pathname])

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    const addToCardHandler = () => {
        const alreadyInCart = cartProducts[variantId] ? true : false;
        dispatch(addToStoreCart(api, lang, productId, variantId, localstorageCartKey, alreadyInCart));
        console.log('[Product page]', 'add to cart product id:', productId);
    }

    const script = [
        helmetJsonLdProp<HelmetProduct>({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            brand: {
                "@type": "Brand",
                name: "ShinePosters"
            },
            offers: [{
                "@type": "Offer",
                url: "/" + location.pathname,
                priceCurrency: currency,
                price: "134.95",
                "priceValidUntil": "2020-11-06",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition"
            }, {
                "@type": "Offer",
                "url": "https://my-product-url.com/",
                "priceCurrency": "EUR",
                "price": "123.99",
                "priceValidUntil": "2020-11-10",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            }],
        }),
    ];
    return (
        <main>
            {/* {console.log('render product page')} */}
            {<SeoMetaTags language={language} pageType={pageType} url={url} script={script} />}
            <div className={styles.topSection}>
                <div className={styles.mainImageSection}>
                    <AddToWishlistSticker
                        variantId={variantId}
                        productId={productId}
                        forceVisual={false}
                        cssClass={styles.wishlistStickerContainer}
                    />
                    <ImageSlider variations={variations} />
                </div>
                {/* {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.wall + images_url.medium} />} */}
                {/* {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.poster + images_url.medium} />} */}

                <div className={styles.productMainData}>
                    {title ? <h1>{title}</h1> : <h1><Placeholder /></h1>}

                    {variantId && product && variations && <p>
                        {variations[variantId].variationPrice[currency]} {allCurrencies[currency].sign}
                    </p>}

                    {product && variantId && variations &&
                        <AllFeaturesDisplay
                            currentVariationCode={variations[variantId].variationCode}
                            allProductVariation={variations}
                            displayOnProductPage={true}
                        />
                    }


                    <BlackButton
                        label={addToCart}
                        clickHandler={addToCardHandler}
                        uppercase={true}
                    />
                </div>
            </div>
            <div className={styles.dividerSection}>
                wysylka itd ikonki jakies
            </div>
            <div>
                rest product info
            </div>
            {/* <FixedBar /> */}

            {variantId && product && product.variations && product.variations[variantId].name}
            <br />

            <br />
            {variantId}
            <br />



        </main>
    )
}

export default withStyles(styles)(Product)
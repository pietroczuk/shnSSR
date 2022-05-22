import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { checkTrueSale, isColorDark, pageTypes, prepareSearchCode, scrollToTop, similarProductTypes } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { getPage, setProductCurrVarId, updateStorePageSingleProductPromoPrice } from '../../redux/actionCreators/page/page.ac';
// SEO
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { helmetJsonLdProp } from "react-schemaorg";
import { Product as HelmetProduct } from "schema-dts";
import BlackButton from '../../components/helpers/ui/blackButton/BlackButton';
import ImageSlider from '../../components/product/imageSlider/ImageSlider';
import { addToStoreCart } from '../../redux/actionCreators/cart/cart.ac';
import AddToWishlistSticker from '../../components/helpers/ui/addToWishlistSticker/AddToWishlistSticker';
import { setGlobalDefaultVariantcode } from '../../redux/actionCreators/publicConfig/publicConfig.ac';
import View360 from '../../components/product/view360/View360';
import ImageInViewLoader from '../../components/helpers/ui/imageInViewLoader/ImageInViewLoader';
import LeftStickers from '../../components/product/leftStickers/LeftStickers';
import ShowPrice from '../../components/helpers/display/showPrice/ShowPrice';
import CountDownTimer from '../../components/product/countDownTimer/CountDownTimer';
import PriceSaleInfo from '../../components/product/priceSaleInfo/PriceSaleInfo';
import Reviews from '../../components/product/reviews/Reviews';
import SimilarSlider from '../../components/product/similarSlider/SimilarSlider';

interface ProductProps {
    url: string;
    lang: string;
}

const Product: FC<RouteComponentProps<ProductProps>> = (props) => {
    const pageType = pageTypes.productPage;
    const { product, api,
        images_url,
        // allCurrencies, 
        currency, language,
        ssr,
        title,
        titlekey,
        addToCart, cartProducts, productId, lang, localstorageCartKey,
        defaultVariantCode,
        panoramaWidth,
        panoramaHeight,
        imagesAspectRatio
    } = useSelector(
        (state: RootState) => ({
            product: state.Page.data.productPage,
            api: state.SystemConfig.api,
            images_url: state.SystemConfig.images,
            allCurrencies: state.SystemConfig.allCurrencies,
            currency: state.User.currency,
            language: state.User.language,
            ssr: state.PublicConfig.ssr,
            title: state.Page.info.title,
            titlekey: state.Page.info.titlekey,
            addToCart: state.PublicConfig.translations.addToCart,
            cartProducts: state.Cart.products,
            productId: state.Page.info.id,
            lang: state.User.language,
            localstorageCartKey: state.SystemConfig.localstorageKeys.cart,
            defaultVariantCode: state.PublicConfig.defaultVariantCode,
            panoramaWidth: state.PublicConfig.config.panorama.maxWidth,
            panoramaHeight: state.PublicConfig.config.panorama.maxHeight,
            imagesAspectRatio: state.PublicConfig.config.imagesAspectRatio.productPage,

        }), shallowEqual
    );


    const dispatch = useDispatch();

    const currentVariationId = product ? product.currentVariationId : null;
    const variations = product ? product.variations : null;
    const variationHashmap = product ? product.hashmap : null;
    const currentVariationCode = variations && variations[currentVariationId] ? variations[currentVariationId].variationCode : null;

    const isDarkVariantBgColor = currentVariationId ? isColorDark(variations[currentVariationId].color) : true;

    const productIsLoaded = variations && variations[currentVariationId] ? true : false;
    const variantImages = productIsLoaded ? variations[currentVariationId].variationImage : null;

    const sale = product ? product.sale : { enable: false, startSale: null, stopSale: null, percent: 0 };

    const showPromo = useSelector((state: RootState) => {
        const now = state.User.today.date;
        return checkTrueSale(sale, now);
    });

    const allPrices = variations && variations[currentVariationId] ? variations[currentVariationId].variationPrice : null;
    const salePrice = allPrices && showPromo && sale.enable ? variations[currentVariationId].salePrice : null;
    const saveMoney = allPrices && showPromo && sale.enable ? variations[currentVariationId].saveMoney : null;

    useEffect(() => {
        sale.enable && dispatch(updateStorePageSingleProductPromoPrice(showPromo));
    }, [showPromo])

    // from props
    const { url,
        // lang 
    } = props.match.params;
    const { location } = props;
    const { search } = location;



    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageType, language, url, prepareSearchCode(search), axiosAbortController));

        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
        }

    }, [location.pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr()) && console.log('disable ssr');
    }, []);

    useEffect(() => {
        /**
         * on init change default variant code
         */
        const variantId = prepareSearchCode(search);
        if (variantId !== currentVariationId && productIsLoaded) {
            dispatch(setProductCurrVarId(variantId, variations));
        }

        /**
        * set global variant code based on current variant code
        */
        const currentGlobalVariationCode = variations[variantId] ? variations[variantId].variationCode : null;
        currentGlobalVariationCode && Object.entries(currentGlobalVariationCode).forEach(([key, varianCode]) => {
            const codeObj = {
                code: varianCode.code,
                atribId: varianCode.atribId
            }
            if (defaultVariantCode[key].code !== codeObj.code && defaultVariantCode[key].atribId !== codeObj.atribId) {
                dispatch(setGlobalDefaultVariantcode(key, codeObj));
                console.log('change default global variant code');
            }
        });
    }, [search, productId])


    const addToCardHandler = () => {
        const alreadyInCart = cartProducts[currentVariationId] ? true : false;
        dispatch(addToStoreCart(api, lang, productId, currentVariationId, localstorageCartKey, alreadyInCart));
        // console.log('[Product page]', 'add to cart product id:', productId);
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
                    <LeftStickers sale={sale} showPromo={showPromo} />
                    <AddToWishlistSticker
                        variantId={currentVariationId}
                        productId={productId}
                        forceVisual={false}
                        cssClass={styles.wishlistStickerContainer}
                        whiteIcon={isDarkVariantBgColor}
                    />
                    <ImageSlider variations={variations} alt={title ? title : 'ShinePosters'} />
                </div>
                <div className={styles.productMainData}>
                    {titlekey ? <h1>{titlekey}</h1> : <h1><Placeholder /></h1>}
                    {title ? <div>{title}</div> : <div><Placeholder /></div>}
                    {/* {title ? <h1>{title}</h1> : <h1><Placeholder /></h1>} */}
                    {/* <p>promocja wazna przez</p> */}
                    {productIsLoaded && showPromo && <CountDownTimer stopSale={sale.stopSale} showContainer={true} />}
                    <div className={styles.priceContener}>

                        {productIsLoaded && allPrices &&
                            <ShowPrice allPrices={allPrices} salePrice={salePrice} quantity={1} showPromo={showPromo} />
                        }
                        {showPromo && <PriceSaleInfo percent={sale.percent} saveMoney={saveMoney} />}
                    </div>

                    {productIsLoaded &&
                        <AllFeaturesDisplay
                            currentVariationCode={currentVariationCode}
                            variationHashmap={variationHashmap}
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
            <div className={styles.detailsSection}>
                <div className={styles.detailRow}>
                    <div className={`${styles.dataCointaner} ${styles.detailColumn}`}>
                        info o papierz etc
                        {productIsLoaded && variations[currentVariationId].name}
                    </div>
                    <ImageInViewLoader
                        title={title}
                        cssClass={styles.detailColumn}
                        aspectRatioWidth={imagesAspectRatio.detail.width}
                        aspectRatioHeight={imagesAspectRatio.detail.height}
                        imgSrc={variantImages ? images_url.url + '/' + variantImages.detail + images_url.large : ''}
                    />
                </div>
                <div className={`${styles.detailRow} ${styles.reverse}`}>
                    <div className={`${styles.dataCointaner} ${styles.detailColumn}`}>
                        opis 360 daj sie oczarowac etc
                        {productIsLoaded && variations[currentVariationId].name}
                    </div>
                    <ImageInViewLoader
                        title={title}
                        cssClass={styles.detailColumn}
                        aspectRatioWidth={panoramaWidth}
                        aspectRatioHeight={panoramaHeight}
                        placeholderStyle={{ maxWidth: panoramaWidth + 'px', height: 'auto' }}
                    >
                        {variantImages && <View360 imgSrc={images_url.url + '/' + variantImages.view360} />}
                    </ImageInViewLoader>
                </div>
                <div className={styles.detailRow}>
                    <div className={`${styles.dataCointaner} ${styles.detailColumn}`}>
                        <Reviews />
                    </div>
                    <ImageInViewLoader
                        title={title}
                        cssClass={styles.detailColumn}
                        aspectRatioWidth={imagesAspectRatio.review.width}
                        aspectRatioHeight={imagesAspectRatio.review.height}
                        imgSrc={variantImages ? images_url.url + '/' + variantImages.review + images_url.large : ''}
                    />
                </div>
                <div className={`${styles.detailRow} ${styles.reverse}`}>
                    <div className={`${styles.dataCointaner} ${styles.detailColumn}`}>
                        wysylka
                    </div>
                    <ImageInViewLoader
                        title={title}
                        cssClass={styles.detailColumn}
                        aspectRatioWidth={imagesAspectRatio.pack.width}
                        aspectRatioHeight={imagesAspectRatio.pack.height}
                        imgSrc={images_url.url + '/' + images_url.packFilename + images_url.large}
                    />
                </div>
            </div>
            {/* <FixedBar /> */}


            <br />

            <br />
            {currentVariationId}
            <br />
            <div>
                <h1>Kolekcja</h1>
                <SimilarSlider type={similarProductTypes.collection} />
            </div>
            <div>
                <h1>Kategoria</h1>
                <SimilarSlider type={similarProductTypes.category} />
            </div>
            <div>
                <h1>Ostatnio ogladane</h1>
            </div>



        </main>
    )
}

export default withStyles(styles)(Product)
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

interface ProductProps {
    url: string;
    lang: string;
}

const Product: FC<RouteComponentProps<ProductProps>> = (props) => {
    const pageType = pageTypes.productPage;
    const { product, api,
        // images_url, 
        allCurrencies, currency, language, ssr, title, addToCart } = useSelector(
            (state: RootState) => ({
                product: state.Page.data.productPage,
                api: state.SystemConfig.api,
                // images_url: state.SystemConfig.images,
                allCurrencies: state.SystemConfig.allCurrencies,
                currency: state.User.currency,
                language: state.User.language,
                ssr: state.PublicConfig.ssr,
                title: state.Page.info.title,
                addToCart: state.PublicConfig.translations.addToCart
            }), shallowEqual
        )
    const dispatch = useDispatch();

    const currentVariationId = product ? product.currentVariationId : null;
    const variations = product ? product.variations : null;
    // from props
    const { url,
        // lang 
    } = props.match.params;
    const { location } = props;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        !ssr && dispatch(getPage(api, pageType, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        // console.log('location changed');
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
        }

    }, [location.pathname])

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    const addToCardHandler = () => { }

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
            {console.log('render product page')}
            {<SeoMetaTags language={language} pageType={pageType} url={url} script={script} />}
            <div className={styles.topSection}>
                <div className={styles.imageSlider}>
                    <ImageSlider variations={variations} />
                    {/* {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.wall + images_url.medium} />} */}
                    {/* {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.poster + images_url.medium} />} */}
                </div>
                <div className={styles.productMainData}>
                    {title ? <h1>{title}</h1> : <h1><Placeholder /></h1>}

                    {product && currentVariationId && product.variations &&
                        <AllFeaturesDisplay
                            currentVariationCode={product.variations[currentVariationId].variationCode}
                            allProductVariation={product.variations}
                        />
                    }

                    {currentVariationId && product && product.variations && <p>
                        {product.variations[currentVariationId].variationPrice[currency]} {allCurrencies[currency].sign}
                    </p>}


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

            {currentVariationId && product && product.variations && product.variations[currentVariationId].name}
            <br />

            <br />
            {currentVariationId}
            <br />



        </main>
    )
}

export default withStyles(styles)(Product)
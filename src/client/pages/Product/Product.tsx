import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, prepareSearchCode, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { getPage } from '../../redux/actionCreators/page/page.ac';

interface ProductProps {
    url: string;
    lang: string;
}

const Product: React.FC<RouteComponentProps<ProductProps>> = (props) => {
    const pageType = pageTypes.productPage;
    const { product, api, images_url, allCurrencies, currency, language, ssr, title } = useSelector(
        (state: RootState) => ({
            product: state.Page.data.productPage,
            api: state.SystemConfig.api,
            images_url: state.SystemConfig.images,
            allCurrencies: state.SystemConfig.allCurrencies,
            currency: state.User.currency,
            language: state.User.language,
            ssr: state.PublicConfig.ssr,
            title: state.Page.info.title
        }), shallowEqual
    )
    const dispatch = useDispatch();

    const currentVariationId = product ? product.currentVariationId : null;
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

    return (
        <div>
            {<SeoMetaTags language={language} pageType={pageType} url={url} />}
            Product page
            {/* <FixedBar /> */}
            {title ?
                <h1>{title}</h1> : <h1><Placeholder /></h1>
            }
            {currentVariationId && product && product.variations && product.variations[currentVariationId].name}
            <br />
            {currentVariationId && product && product.variations && <p>
                {product.variations[currentVariationId].variationPrice[currency]} {allCurrencies[currency].sign}
            </p>}
            <br />
            {currentVariationId}
            <br />
            {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.poster + images_url.medium} />}
            {currentVariationId && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[currentVariationId].variationImage.wall + images_url.medium} />}

            {product && currentVariationId && product.variations &&
                <AllFeaturesDisplay
                    currentVariationCode={product.variations[currentVariationId].variationCode}
                    allProductVariation={product.variations}
                // isGlobalChange={true}
                />
            }
        </div>
    )
}

export default withStyles(styles)(Product)
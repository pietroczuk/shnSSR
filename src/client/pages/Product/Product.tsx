import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, prepareSearchCode, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import SeoMetaTags from '../../components/seoMetaTags/seoMetaTags';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';

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

    const current_variation_id = product ? product.current_variation_id : null;
    // from props
    const { url, 
        // lang 
    } = props.match.params;
    const { location } = props;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        dispatch(getPage(api, pageType, language, url, prepareSearchCode(location.search), axiosAbortController));
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
            {current_variation_id && product && product.variations && product.variations[current_variation_id].name}
            <br />
            {current_variation_id && product && product.variations && <p>
                {product.variations[current_variation_id].variation_price[currency]} {allCurrencies[currency].sign}
            </p>}
            <br />
            {current_variation_id}
            <br />
            {current_variation_id && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[current_variation_id].variation_image.poster + images_url.medium} />}
            {current_variation_id && product && product.variations && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[current_variation_id].variation_image.wall + images_url.medium} />}

            {product && current_variation_id && product.variations &&
                <AllFeaturesDisplay
                    currentVariationCode={product.variations[current_variation_id].variation_code}
                    allProductVariation={product.variations}
                // isGlobalChange={true}
                />
            }
        </div>
    )
}

export default withStyles(styles)(Product)
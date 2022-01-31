import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { pageTypes, metatags, prepareSearchCode, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
// import FixedBar from '../../components/fixedbar/FixedBar';

// import AllFeaturesDisplay from ' ../../components/features/AllFeaturesDisplay';
import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';

const Product: FC<RouteComponentProps<{ url: string, lang: string }>> = (props) => {
    // from redux
    const { seo, product,
        // type, 
        api, url_prefix, images_url, all_config_currencies, user_currency_code, ssr } = useSelector(
            (state: RootState) => ({
                seo: state.PublicConfig.config.seo,
                product: state.Page.data ? state.Page.data : null,
                api: state.SystemConfig.api,
                url_prefix: state.SystemConfig.urls[pageTypes.productPage],
                images_url: state.SystemConfig.images,
                all_config_currencies: state.SystemConfig.currency,
                user_currency_code: state.User.currency,
                ssr: state.PublicConfig.ssr
            }), shallowEqual
        )
    const dispatch = useDispatch();
    // seo
    const seo_title = product ? product.seo_title : null;
    const seo_description = product ? product.seo_description : null;
    const current_variation_id = product ? product.current_variation_id : null;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        dispatch(getPage(api, pageTypes.productPage, lang, url, prepareSearchCode(location.search), axiosAbortController));
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
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            Product page
            {/* <FixedBar /> */}
            {product ?
                <h1>{product.title}</h1> : <h1><Placeholder /></h1>
            }
            {current_variation_id && product !== undefined && product && product.variations && product.variations[current_variation_id].name}
            <br />
            {current_variation_id && product && product.variations &&<p>
                {product.variations[current_variation_id].variation_price[user_currency_code]} {all_config_currencies[user_currency_code].sign}
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
                // globalChange={true}
                />
            }
        </div>
    )
}

export default withStyles(styles)(Product)
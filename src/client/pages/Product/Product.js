import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './product.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice'; 
import { pageTypes, metatags, prepareSearchCode, scrollToTop } from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
// import FixedBar from '../../components/header/fixedbar/FixedBar';

import AllFeaturesDisplay from '../../components/features/AllFeaturesDisplay';


const Product = (props) => {
    // from redux
    const { seo, product, type, api, url_prefix, images_url, all_config_currencies, user_currency_code } = useSelector(
        state => ({
            seo: state.PublicConfig.config.seo,
            product: state.Page.data ? state.Page.data : null,
            type: state.Page.type ? state.Page.type : null,
            api: state.SystemConfig.api,
            url_prefix: state.SystemConfig.urls[pageTypes.productPage],
            images_url: state.SystemConfig.images,
            all_config_currencies: state.SystemConfig.currency,
            user_currency_code: state.User.currency
        })
    )
    const dispatch = useDispatch();
    // seo
    const seo_title = product ? product.seo_title : null;
    const seo_description = product ? product.seo_description : null;
    const current_variation_id = product ? product.current_variation_id : null;
    // from props
    const { url, lang } = props.match.params;
    const { location } = props;

    // console.log(product.variations[current_variation_id].variation_price[user_currency_code], user_currency_code);

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    const setCurrentLocationHandler = loc => {
        if (currentLocation !== loc) {
            setCurrentLocation(loc);
        }
    }

    useEffect(() => {
        if (!product || currentLocation !== location.pathname || type !== pageTypes.productPage) {
            dispatch(getPage(api, pageTypes.productPage, lang, url, prepareSearchCode(location.search)));
            setCurrentLocationHandler(location.pathname);
            scrollToTop(window);
        }
        return () => dispatch(pageActions.clearPageData());
    }, [location.pathname, dispatch])

    return (
        <div>
            {metatags(seo_title, seo_description, seo, url, lang, url_prefix)}
            Product page
            {/* <FixedBar /> */}
            {product ?
                <h1>{product.title}</h1> : <h1><Placeholder /></h1>
            }
            {current_variation_id && product.variations[current_variation_id].name}
            <br />
            {current_variation_id && <p>
                {product.variations[current_variation_id].variation_price[user_currency_code]} {all_config_currencies[user_currency_code].sign}
            </p>}
            <br />
            {current_variation_id}
            <br />
            {current_variation_id && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[current_variation_id].variation_image.poster + images_url.medium} />}
            {current_variation_id && <img width="300px" height="400px" alt="aaa" src={images_url.url + '/' + product.variations[current_variation_id].variation_image.wall + images_url.medium} />}

            {product && current_variation_id && <AllFeaturesDisplay currentVariationCode={product.variations[current_variation_id].variation_code} allProductVariation={product.variations} />}
        </div>
    )
}

export default withStyles(styles)(Product)
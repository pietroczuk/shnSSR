import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { prepUrlFromConfigSlug, pageTypes, getObjectLength, cutText } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import DivNavLink from '../DivNavLink/DivNavLink';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../helpers/ui/addToWishlistSticker/AddToWishlistSticker';
import ShowPrice from '../helpers/display/showPrice/ShowPrice';
import ImageDisplay from './imageDisplay/ImageDisplay';

import loadable from '@loadable/component';

const ShowSelectedAttributes = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showSelectedAttributes/ShowSelectedAttributes'), {});
const ShowAddToCartVariants = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showAddToCartVariants/ShowAddToCartVariants'), {});

const ProductItem = props => {
    const { product, forceVisual, index = 0, imagesInRootVariant, wishlistPage } = props;

    const placeholder = product ? false : true;

    const { title, titlekey, variations, url, min_price, likes, id } = product ? product : {
        title: null,
        titlekey: null,
        variations: null,
        url: null,
        min_price: null,
        likes: null,
        id: null
    };
    const productId = id;

    const {
        language,
        slug_urls,
        translation,
        showRandom,
        multilanguage,
    } = useSelector(state => ({
        language: state.User.language,
        showRandom: state.Display.showRandom,
        slug_urls: state.SystemConfig.urls,
        translation: state.PublicConfig.translation,
        multilanguage: state.SystemConfig.multilanguage,
    }), shallowEqual);

    const [ssr, setSrr] = useState(true);

    const initialState = {
        variantIndexStyle: null,
        variantId: null,
    }
    const setVariantIndexStyleHelper = () => {
        let newVariantIndexStyle = showRandom ? index < getObjectLength(variations) ? index : index % getObjectLength(variations) : 0;
        newVariantIndexStyle = newVariantIndexStyle == 1 ? 4 : newVariantIndexStyle == 4 ? 1 : newVariantIndexStyle;
        return newVariantIndexStyle;
    }
    const setVariantIdHelper = indexNumber => {
        return productId && variations[Object.keys(variations)[indexNumber]] ? variations[Object.keys(variations)[indexNumber]].id : null;
    }
    if (ssr) {
        initialState.variantIndexStyle = ssr ? setVariantIndexStyleHelper() : null;
        initialState.variantId = setVariantIdHelper(initialState.variantIndexStyle);
    }
    const [variantIndexStyle, setVariantIndexStyle] = useState(initialState.variantIndexStyle);
    const changeVariantIndexStyle = varIndexStyle => {
        variantIndexStyle !== varIndexStyle && setVariantIndexStyle(varIndexStyle);
    }
    const setVariantIndexStyleHandler = () => {
        changeVariantIndexStyle(setVariantIndexStyleHelper());
    }

    const [variantId, setVariantId] = useState(initialState.variantId);
    const changeVariantId = vId => {
        vId !== variantId && setVariantId(vId);
    }
    const setVariantIdHandler = () => {
        changeVariantId(setVariantIdHelper(variantIndexStyle));
    }

    const variantIdForUrl = variantId ? variantId : initialState.variantId;
    const productUrl = prepUrlFromConfigSlug(language, slug_urls, pageTypes.productPage, null, url, multilanguage, variantIdForUrl);

    const [onHover, setOnHover] = useState(false);

    const onHoverHandler = () => {
        !placeholder && setOnHover(true);
    }
    const onLeaveHandler = () => {
        !placeholder && setOnHover(false);
    }
    useEffect(() => {
        setSrr(false);
    }, []);
    useEffect(() => {
        !ssr && setVariantIndexStyleHandler();
    }, [showRandom, index, variations, setVariantIndexStyleHandler]);
    useEffect(() => {
        !ssr && setVariantIdHandler();
    }, [variantIndexStyle, setVariantIdHandler]);

    const imagesHolderUrl = imagesInRootVariant ? product : variations ? variations[Object.keys(variations)[variantIndexStyle]] : null;
    
    return <div className={`${styles.productItemContainer} ${placeholder ? styles.disable : ''}`}
        onMouseEnter={onHoverHandler} onMouseLeave={onLeaveHandler}
    >
        {!placeholder && <AddToWishlistSticker
            showLikes={true}
            likes={likes}
            variantId={variantId}
            productId={productId}
        />
        }
        {/* <link rel="preload" src={getProductImageUrl()} /> */}
        <DivNavLink to={productUrl}>
            <ImageDisplay title={title} imagesHolderUrl={imagesHolderUrl} forceVisual={forceVisual} onHover={onHover} placeholder={placeholder}/>
        </DivNavLink>
        {wishlistPage && <ShowAddToCartVariants
            avaibleVariations={variations}
            active={onHover}
            productId={productId}
        />}
        <DivNavLink to={productUrl}>
            <div className={styles.productDataContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        {placeholder && <Placeholder customWidth={'100%'} />}
                        {!placeholder && titlekey}
                    </div>
                    <div className={styles.subtitle}>
                        {placeholder && <Placeholder customWidth={'50%'} />}
                        {!placeholder && cutText(title)}
                    </div>
                    {wishlistPage && <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} />}
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.label}>
                        {!placeholder && translation && translation.price_from ? translation.price_from : ''}
                    </div>
                    <ShowPrice allPrices={min_price} />
                </div>
            </div>
        </DivNavLink>
    </div>
}
export default withStyles(styles)(ProductItem);
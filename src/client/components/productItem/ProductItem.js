import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { prepUrlFromConfigSlug, pageTypes, getObjectLength, cutText, intersectArray, isObjectEmpty } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import DivNavLink from '../DivNavLink/DivNavLink';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../helpers/ui/addToWishlistSticker/AddToWishlistSticker';
import ShowPrice from '../helpers/display/showPrice/ShowPrice';
import ImageDisplay from './imageDisplay/ImageDisplay';

import loadable from '@loadable/component';
import ShowAvaibleFeatures from '../helpers/product/productItem/showAvaibleFeatures/ShowAvaibleFeatures';

const ShowSelectedAttributes = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes'), {});
const ShowAddToCartVariants = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/productItem/showAddToCartVariants/ShowAddToCartVariants'), {});

const ProductItem = props => {
    const { product, forceVisual, index = 0, imagesInRootVariant, wishlistPage, wishlistVariantId } = props;

    const placeholder = product ? false : true;

    const { title, titlekey, variations, url, min_price, likes, id, hashmap } = product ? product : {
        title: null,
        titlekey: null,
        variations: null,
        url: null,
        min_price: null,
        likes: null,
        id: null,
        hashmap: null
    };
    const productId = id;

    const {
        language,
        slug_urls,
        translation,
        showRandom,
        multilanguage,
        default_variant_code,
        ssr,
    } = useSelector(state => ({
        language: state.User.language,
        showRandom: state.Display.showRandom,
        slug_urls: state.SystemConfig.urls,
        translation: state.PublicConfig.translation,
        multilanguage: state.SystemConfig.multilanguage,
        default_variant_code: state.PublicConfig.default_variant_code,
        ssr: state.PublicConfig.ssr,
    }), shallowEqual);

    const [onHover, setOnHover] = useState(false);

    const onHoverHandler = () => {
        !placeholder && setOnHover(true);
    }
    const onLeaveHandler = () => {
        !placeholder && setOnHover(false);
    }

    const [disableLocalRandom, setDisableLocalRandom] = useState(false);

    useEffect(()=>{
        !ssr && !wishlistPage && setDisableLocalRandom(false);
    },[showRandom, default_variant_code])

    const [localVariantCode, setLocalVariantCode] = useState(default_variant_code);

    useEffect(() => {    
        !ssr && !wishlistPage && setLocalVariantCode(default_variant_code);
    }, [default_variant_code, showRandom]);

   
    const changeLocalVariantCode = (featureId, obj) => {
        if (isObjectEmpty(obj) || !featureId || !obj.atrib_id) {
            return;
        }
        console.log(featureId, obj, localVariantCode[featureId]);
        const atrib_id = obj.atrib_id;
        if (localVariantCode[featureId] && localVariantCode[featureId].atrib_id !== atrib_id) {
            const newFeatObj = { ...localVariantCode }
            newFeatObj[featureId] = obj;
            newFeatObj[featureId].wishlist = localVariantCode[featureId].wishlist;
            setDisableLocalRandom(true);
            setLocalVariantCode(newFeatObj);

            console.log(localVariantCode[featureId], newFeatObj);
        }
    }

    const [variantId, setVariantId] = useState(null);
    const changeVariantId = vId => {
        vId !== variantId && setVariantId(vId);
    }

    const setupVariantIdOnHashmap = () => {
        if (hashmap && (!showRandom || disableLocalRandom)) {
            const productVarianArray = [];
            for (const featureKey in localVariantCode) {
                if (localVariantCode[featureKey].wishlist) {
                    productVarianArray.push(hashmap[featureKey][localVariantCode[featureKey].atrib_id]);
                }
            }
            const variantFound = productVarianArray.length > 1 ? intersectArray(productVarianArray) : [];
            variantFound[0] && changeVariantId(variantFound[0]);
        }
        // if (showRandom && !disableLocalRandom) {
        if (showRandom && !disableLocalRandom) {
            let newVariantIndexStyle = index < getObjectLength(variations) ? index : index % getObjectLength(variations);
            newVariantIndexStyle = newVariantIndexStyle == 1 ? 4 : newVariantIndexStyle == 4 ? 1 : newVariantIndexStyle;
            newVariantIndexStyle = productId && variations[Object.keys(variations)[newVariantIndexStyle]] ? variations[Object.keys(variations)[newVariantIndexStyle]].id : null
            newVariantIndexStyle && changeVariantId(newVariantIndexStyle) 
        }
    }

    useEffect(() => {
        !ssr && !wishlistPage && setupVariantIdOnHashmap();
    }, [localVariantCode, showRandom]);

    useEffect(() => {
        wishlistVariantId && changeVariantId(wishlistVariantId);
    }, [wishlistPage, wishlistVariantId])


    ssr && !wishlistPage && setupVariantIdOnHashmap();

    const productUrl = prepUrlFromConfigSlug(language, slug_urls, pageTypes.productPage, null, url, multilanguage, variantId);
    const imagesHolderUrl = imagesInRootVariant ? product : variations ? variations[variantId] : null;

    const currentVariationCode = variations && variantId ? variations[variantId].variation_code : null;

    return <div className={`${styles.productItemContainer} ${placeholder ? styles.disable : ''}`}
        onMouseEnter={onHoverHandler} onMouseLeave={onLeaveHandler}
    >
        {/* {console.log(localVariantCode)} */}
        {/* {console.log(variantId)} */}
        {!placeholder && <AddToWishlistSticker
            showLikes={true}
            likes={likes}
            variantId={variantId}
            productId={productId}
        />
        }
        <DivNavLink to={productUrl}>
            <ImageDisplay title={title} imagesHolderUrl={imagesHolderUrl} forceVisual={forceVisual} onHover={onHover} placeholder={placeholder} />
        </DivNavLink>
        {wishlistPage && <ShowAddToCartVariants
            avaibleVariations={variations}
            active={onHover}
            productId={productId}
        />}
        {!wishlistPage && !placeholder && <ShowAvaibleFeatures
            // active={onHover}
            active={true}
            currentVariationCode={currentVariationCode}
            // currentVariationCode={localVariantCode}
            onClickFunction={changeLocalVariantCode}

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
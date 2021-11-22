import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { prepUrlFromConfigSlug, pageTypes, getObjectLength, cutText, runSSRfunctions } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import LoadingSpinner from '../helpers/ui/loadingSpinner/LoadingSpinner';

import DivNavLink from '../DivNavLink/DivNavLink';
import Blank from '../svg/blank/Blank';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../helpers/ui/addToWishlistSticker/AddToWishlistSticker';
import ShowPrice from '../helpers/display/showPrice/ShowPrice';

import loadable from '@loadable/component';

const ShowSelectedAttributes = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showSelectedAttributes/ShowSelectedAttributes'), {});
const ShowAddToCartVariants = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showAddToCartVariants/ShowAddToCartVariants'), {});

const ProductItem = props => {
    const { product, forceVisual = false, index = 0, imagesInRootVariant, wishlistPage } = props;

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

    /**
    * value that we neet to multiply aspect ratio from api, ex:
    * api -> 4 * 100 => 400 (px)
    */
    const multiplyMesurment = 100;

    const {
        image_width,
        image_height,
        imagesConfig,
        language,
        slug_urls,
        translation,
        showVisual,
        showRandom,
        multilanguage,
    } = useSelector(state => ({
        imagesConfig: state.SystemConfig.images,
        image_width: state.SystemConfig.images.aspect_ratio.width * multiplyMesurment,
        image_height: state.SystemConfig.images.aspect_ratio.height * multiplyMesurment,
        language: state.User.language,
        showVisual: state.Display.showVisual,
        showRandom: state.Display.showRandom,
        slug_urls: state.SystemConfig.urls,
        translation: state.PublicConfig.translation,
        multilanguage: state.SystemConfig.multilanguage,
    }));

    const showVisualImage = showVisual || forceVisual ? true : false;

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
    if(ssr) {
        initialState.variantIndexStyle = ssr ? setVariantIndexStyleHelper(): null;
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
        setOnHover(true);
    }
    const onLeaveHandler = () => {
        setOnHover(false);
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

    const getProductImageUrl = () => {
        // return null;
        const img_base = imagesConfig.url + '/';
        const img_size = imagesConfig.large;
        const imagesHolderUrl = imagesInRootVariant ? product : variations[Object.keys(variations)[variantIndexStyle]];

        const simple = img_base + imagesHolderUrl.variation_image.poster + img_size;
        const visual = img_base + imagesHolderUrl.variation_image.wall + img_size;
        return showVisualImage ? visual : simple;
    }
    return <div className={`${styles.productItemContainer} ${placeholder ? styles.disable : ''}`}
        onMouseEnter={onHoverHandler} onMouseLeave={onLeaveHandler}
    >
        {!placeholder && <AddToWishlistSticker
            visualMode={showVisualImage}
            showLikes={true}
            likes={likes}
            variantId={variantId}
            productId={productId}
        />
        }
        {/* <link rel="preload" src={getProductImageUrl()} /> */}
        <DivNavLink to={productUrl}>
            <div className={styles.imageContainer}>
                <div className={styles.imageContainerRelative}>
                    <div className={`${styles.imagePicture} ${showVisualImage ? styles.noPadding : ''} ${onHover ? styles.slideTop : ''}`}>
                        {placeholder && <LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={3} customBorderTopColor={'#f3f3f3'} />}
                        {!placeholder && <img style={{ width: '100%', height: '100%' }} className={styles.single} alt={titlekey} src={getProductImageUrl()} />}
                    </div>
                    <div className={styles.imagePlaceholder} >
                        <Blank width={image_width} height={image_height} />
                    </div>
                </div>
            </div>
        </DivNavLink>
        {wishlistPage && <ShowAddToCartVariants
            avaibleVariations={variations}
            active={onHover}
            productId={productId}
        // active={true} 
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
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { prepareProductLink, getPriceByCurrency, setLocalStorageWishlist } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import LoadingSpinner from '../ui/loadingSpinner/LoadingSpinner';

import Blank from '../svg/blank/Blank';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../ui/addToWishlistSticker/AddToWishlistSticker'

const ProductItem = ({ product, forceVisual = false, index }) => {
    const [variantId, setVariantId] = useState(null);
    const changeVariantId = vId => {
        vId !== variantId && setVariantId(vId);
    }

    const placeholder = product ? false : true;

    const { title, titlekey, variations, url, min_price, likes } = product ? product : {
        title: null,
        titlekey: null,
        variations: null,
        url: null,
        min_price: null,
        likes: null
    };
    /**
     * value that we neet to multiply aspect ratio from api, ex:
     * api -> 4 * 100 => 400 (px)
     */
    const multiplyMesurment = 100;
    const { image_width, image_height, images_url, language, userCurrency, currency, slug_urls, translation, showVisual, showRandom, localstorageWishlistKey } = useSelector(state => ({
        image_width: state.SystemConfig.images.aspect_ratio.width * multiplyMesurment,
        image_height: state.SystemConfig.images.aspect_ratio.height * multiplyMesurment,
        images_url: state.SystemConfig.images,
        language: state.User.language,
        userCurrency: state.User.currency,
        showVisual: state.Display.showVisual,
        showRandom: state.Display.showRandom,
        currency: state.SystemConfig.currency,
        slug_urls: state.SystemConfig.urls.product,
        translation: state.PublicConfig.translation,
        localstorageWishlistKey: state.SystemConfig.localstorage_keys.wishlist,
    }));
    const product_url = !placeholder ? prepareProductLink(language, slug_urls, url) : '#';

    // useEffect(()=> {   
    //     product && changeVariantId(product.variations[Object.keys(variations)[0]].id);
    // },[])

    const showVisualImage = showVisual || forceVisual ? true : false;
    const getProductImageUrl = () => {
        let variantIndexStyle = showRandom ? index < Object.keys(variations).length ? index : index % Object.keys(variations).length : 0;
        // set middle images in visual mode to dark background
        variantIndexStyle = variantIndexStyle == 1 ? 4 : variantIndexStyle == 4 ? 1 : variantIndexStyle;
        changeVariantId(product.variations[Object.keys(variations)[variantIndexStyle]].id);
        const img_base = images_url.url + '/';
        const img_size = '?size=700&sh=7&q=80';
        const simple = img_base + variations[Object.keys(variations)[variantIndexStyle]].variation_image.poster + img_size;
        const visual = img_base + variations[Object.keys(variations)[variantIndexStyle]].variation_image.wall + img_size;
        return showVisualImage ? visual : simple;
    }

    const wishListClickHandler = () => {
        const productData = product;
        variantId && productData && setLocalStorageWishlist(variantId, productData, localstorageWishlistKey);
    }
    return <div className={`${styles.productItemContainer} ${placeholder ? styles.disable : ''}`}>
        {!placeholder && <AddToWishlistSticker visualMode={showVisualImage} likes={likes} clickHandler={wishListClickHandler} />}
        <NavLink to={product_url}>
            <div className={styles.imageContainer}>
                <div className={styles.imageContainerRelative}>
                    <div className={`${styles.imagePicture} ${showVisualImage ? styles.noPadding : ''}`}>
                        {placeholder && <LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={3} customBorderTopColor={'#f3f3f3'} />}
                        {!placeholder && <img style={{ width: '100%', height: '100%' }} className={styles.single} alt={titlekey} src={getProductImageUrl()} />}
                    </div>
                    <div className={styles.imagePlaceholder} >
                        <Blank width={image_width} height={image_height} />
                    </div>
                </div>
            </div>
            <div className={styles.productDataContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        {placeholder && <Placeholder customWidth={'100%'} />}
                        {!placeholder && titlekey}
                    </div>
                    <div className={styles.subtitle}>
                        {placeholder && <Placeholder customWidth={'50%'} />}
                        {!placeholder && title}
                    </div>
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.label}>
                        {!placeholder && translation && translation.price_from ? translation.price_from : ''}
                    </div>
                    <div className={styles.price}>
                        {!placeholder && getPriceByCurrency(min_price, userCurrency, currency)}
                    </div>
                </div>
            </div>
        </NavLink>
    </div>
}
export default withStyles(styles)(ProductItem);
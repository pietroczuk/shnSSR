import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { prepUrlFromConfigSlug, getPriceByCurrency, pageTypes, getObjectLength } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import LoadingSpinner from '../helpers/ui/loadingSpinner/LoadingSpinner';

import DivNavLink from '../DivNavLink/DivNavLink';
import Blank from '../svg/blank/Blank';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../helpers/ui/addToWishlistSticker/AddToWishlistSticker';

import loadable from '@loadable/component';

const ShowSelectedAttributes = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showSelectedAttributes/ShowSelectedAttributes'), {});
const ShowAddToCartVariants = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/showAddToCartVariants/ShowAddToCartVariants'), {});

const ProductItem = props => {
    const { product, forceVisual = false, index = 0, imagesInRootVariant, wishlistPage } = props;
    const [variantId, setVariantId] = useState(null);
    const changeVariantId = vId => {
        vId !== variantId && setVariantId(vId);
    }

    const [onHover, setOnHover] = useState(false);

    const onHoverHandler = () => {
        setOnHover(true);
    }
    const onLeaveHandler = () => {
        setOnHover(false);
    }

    const placeholder = product ? false : true;

    const { title, titlekey, variations, url, min_price, likes } = product ? product : {
        title: null,
        titlekey: null,
        variations: null,
        url: null,
        min_price: null,
        likes: null,
    };
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
        userCurrency,
        currency,
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
        userCurrency: state.User.currency,
        showVisual: state.Display.showVisual,
        showRandom: state.Display.showRandom,
        currency: state.SystemConfig.currency,
        slug_urls: state.SystemConfig.urls,
        translation: state.PublicConfig.translation,
        multilanguage: state.SystemConfig.multilanguage,
    }));
    const product_url = !placeholder ?
        prepUrlFromConfigSlug(language, slug_urls, pageTypes.productPage, null, url, multilanguage, variantId) : null;

    // useEffect(()=> {   
    //     product && changeVariantId(product.variations[Object.keys(variations)[0]].id);
    // },[])

    const showVisualImage = showVisual || forceVisual ? true : false;
    const getProductImageUrl = () => {
        let variantIndexStyle = showRandom ? index < getObjectLength(variations) ? index : index % getObjectLength(variations) : 0;
        // set middle images in visual mode to dark background
        variantIndexStyle = variantIndexStyle == 1 ? 4 : variantIndexStyle == 4 ? 1 : variantIndexStyle;
        changeVariantId(product.variations[Object.keys(variations)[variantIndexStyle]].id);
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
            productData={product}
        />
        }
        <DivNavLink to={product_url}>
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
        </DivNavLink>
        {wishlistPage && <ShowAddToCartVariants 
        active={onHover}
        avaibleVariations={variations}
        // active={true} 
        />}
        <DivNavLink to={product_url}>
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
                    {wishlistPage && <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} />}
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
        </DivNavLink>
    </div>
}
export default withStyles(styles)(ProductItem);
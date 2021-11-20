import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { prepUrlFromConfigSlug, pageTypes, getObjectLength } from '../../utils/utilsFrondend';

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
    const [variantId, setVariantId] = useState(null);
    const changeVariantId = vId => {
        vId !== variantId && setVariantId(vId);
    }
    const [variantIndexStyle, setVariantIndexStyle] = useState(0);
    const changeVariantIndexStyle = varIndexStyle => {
        variantIndexStyle !== varIndexStyle && setVariantIndexStyle(varIndexStyle);
    }

    const [onHover, setOnHover] = useState(false);

    const onHoverHandler = () => {
        setOnHover(true);
    }
    const onLeaveHandler = () => {
        setOnHover(false);
    }

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
    const product_url = !placeholder ?
        prepUrlFromConfigSlug(language, slug_urls, pageTypes.productPage, null, url, multilanguage, variantId) : null;

    useEffect(()=> {   
        let newVariantIndexStyle = showRandom ? index < getObjectLength(variations) ? index : index % getObjectLength(variations) : 0;
        newVariantIndexStyle = newVariantIndexStyle == 1 ? 4 : newVariantIndexStyle == 4 ? 1 : newVariantIndexStyle;
        changeVariantIndexStyle(newVariantIndexStyle);
    },[showRandom, index, variations]);
    useEffect(() => {
        productId && changeVariantId(variations[Object.keys(variations)[variantIndexStyle]].id);
        // set middle images in visual mode to dark background
    },[variantIndexStyle]);

    const showVisualImage = showVisual || forceVisual ? true : false;
    const getProductImageUrl = () => {
        const img_base = imagesConfig.url + '/';
        const img_size = imagesConfig.large;
        const imagesHolderUrl = imagesInRootVariant ? product : variations[Object.keys(variations)[variantIndexStyle]];

        const simple = img_base + imagesHolderUrl.variation_image.poster + img_size;
        const visual = img_base + imagesHolderUrl.variation_image.wall + img_size;
        return showVisualImage ? visual : simple;
    }

    // console.log(variantId);
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
        <DivNavLink to={product_url}>
            <div className={styles.imageContainer}>
                <div className={styles.imageContainerRelative}>
                    <div className={`${styles.imagePicture} ${showVisualImage ? styles.noPadding : ''} ${onHover ? styles.slideTop: ''}`}>
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
                    <ShowPrice allPrices={min_price} />
                </div>
            </div>
        </DivNavLink>
    </div>
}
export default withStyles(styles)(ProductItem);
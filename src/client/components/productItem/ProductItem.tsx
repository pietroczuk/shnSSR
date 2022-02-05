import { FC, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { prepUrlFromConfigSlug, pageTypes, getObjectLength, cutText, intersectArray, isObjectEmpty } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import DivNavLink from '../divNavLink/DivNavLink';
import Placeholder from '../placeholder/Placeholder';
import AddToWishlistSticker from '../helpers/ui/addToWishlistSticker/AddToWishlistSticker';
import ShowPrice from '../helpers/display/showPrice/ShowPrice';
import ImageDisplay from './imageDisplay/ImageDisplay';

import loadable from '@loadable/component';
import ShowAvaibleFeatures from '../helpers/product/productItem/showAvaibleFeatures/ShowAvaibleFeatures';
import { RootState } from '../../client';
import { Product } from '../../redux/Models/Product/Product.model';
import { WishlistProduct } from '../../redux/Models/Wishlist/WishlistProducts/WishlistProduct/WishlistProduct.model';

const ShowSelectedAttributes = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes'), {});
const ShowAddToCartVariants = loadable(() => import(/* webpackPrefetch: true */ '../helpers/product/productItem/showAddToCartVariants/ShowAddToCartVariants'), {});

interface ProductItemProps {
    product?: Product;
    wishlistProduct?: WishlistProduct;
    forceVisual?: boolean;
    index?: number;
    wishlistPage?: boolean;
}

const ProductItem: FC<ProductItemProps> = props => {
    const { product, wishlistProduct, forceVisual, index = 0, wishlistPage} = props;

    const showPlaceholder = !product && !wishlistProduct ? true : false;

    const title = product ? product.title : wishlistProduct ? wishlistProduct.productData.title : null;
    const url = product ? product.url : wishlistProduct ? wishlistProduct.productData.url : null;
    const hashmap = product ? product.hashmap : null;
    const likes = product ? product.likes : wishlistProduct ? wishlistProduct.productData.likes : null;
    const titlekey = product ? product.titlekey : wishlistProduct ? wishlistProduct.productData.titlekey : null;
    const productId = product ? product.id : wishlistProduct ? wishlistProduct.p : null;
    const min_price = product ? product.min_price : wishlistProduct ? wishlistProduct.productData.min_price : null;
    const variations = product ? product.variations : wishlistProduct ? wishlistProduct.productData.variations : null;

    const {
        language,
        pageTypePrefixUrls,
        translations,
        showRandom,
        isMultilanguage,
        defaultVariantCode,
        ssr,
    } = useSelector((state: RootState) => ({
        language: state.User.language,
        showRandom: state.Display.showRandom,
        pageTypePrefixUrls: state.SystemConfig.pageTypePrefixUrls,
        translations: state.PublicConfig.translations,
        isMultilanguage: state.SystemConfig.isMultilanguage,
        defaultVariantCode: state.PublicConfig.defaultVariantCode,
        ssr: state.PublicConfig.ssr,
    }), shallowEqual);

    const [onHover, setOnHover] = useState(false);

    const onHoverHandler = () => {
        !showPlaceholder && setOnHover(true);
    }
    const onLeaveHandler = () => {
        !showPlaceholder && setOnHover(false);
    }

    const [disableLocalRandom, setDisableLocalRandom] = useState(false);

    useEffect(() => {
        !ssr && !wishlistPage && setDisableLocalRandom(false);
    }, [showRandom, defaultVariantCode])

    const [localVariantCode, setLocalVariantCode] = useState(defaultVariantCode);

    useEffect(() => {
        !ssr && !wishlistPage && !showRandom && setLocalVariantCode(defaultVariantCode);
    }, [defaultVariantCode, showRandom]);


    const changeLocalVariantCode = (featureId: string, obj: any) => {
        if (isObjectEmpty(obj) || !featureId || !obj.atrib_id) {
            return;
        }
        // console.log(featureId, obj, localVariantCode[featureId]);
        const atrib_id = obj.atrib_id;
        if (localVariantCode[featureId] && localVariantCode[featureId].atrib_id !== atrib_id && localVariantCode[featureId].wishlist) {
            const newFeatObj = { ...localVariantCode }
            newFeatObj[featureId] = obj;
            newFeatObj[featureId].wishlist = localVariantCode[featureId].wishlist;
            setDisableLocalRandom(true);
            setLocalVariantCode(newFeatObj);
            // console.log('change', newFeatObj);
            // console.log(localVariantCode[featureId], newFeatObj);
        }
    }

    const [variantId, setVariantId] = useState<string>('');
    const setVariantIdHandler = (vId: string) => {
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
            variantFound[0] && setVariantIdHandler(variantFound[0]);
        }
    }

    const changeLocalVariantOnRandom = () => {
        if (showRandom && !disableLocalRandom && variations) {
            let newVariantIndexStyle: string | number | null = index < getObjectLength(variations) ? index : index % getObjectLength(variations);
            newVariantIndexStyle = newVariantIndexStyle == 1 ? 4 : newVariantIndexStyle == 4 ? 1 : newVariantIndexStyle;
            newVariantIndexStyle = productId && variations[Object.keys(variations)[newVariantIndexStyle]] ? variations[Object.keys(variations)[newVariantIndexStyle]].id : null
            newVariantIndexStyle && setVariantIdHandler(newVariantIndexStyle.toString());

            const newFeatObj = { ...localVariantCode }
            let foundChange = false;
            if (newVariantIndexStyle !== null) {
                for (const featureId in variations[newVariantIndexStyle].variation_code) {
                    const atrib_id = variations[newVariantIndexStyle].variation_code[featureId].atrib_id;

                    if (newFeatObj[featureId].atrib_id !== atrib_id) {
                        newFeatObj[featureId] = variations[newVariantIndexStyle].variation_code[featureId];
                        newFeatObj[featureId] = { ...newFeatObj[featureId], wishlist: localVariantCode[featureId].wishlist };
                        foundChange = true;
                    }
                    // changeLocalVariantCode(featureIdInVariantCodes, {...variations[newVariantIndexStyle].variation_code[featureIdInVariantCodes]});
                    // console.log(featureIdInVariantCodes, {...variations[newVariantIndexStyle].variation_code[featureIdInVariantCodes]});
                }
            }
            // isObjectEmpty()
            foundChange && setLocalVariantCode(newFeatObj);
            // console.log(newFeatObj);

        }
    }
    useEffect(() => {
        !ssr && !wishlistPage && showRandom && changeLocalVariantOnRandom()
    }, [showRandom]);
    useEffect(() => {
        !ssr && !wishlistPage && setupVariantIdOnHashmap();
    }, [localVariantCode]);

    useEffect(() => {
        wishlistProduct && wishlistProduct.v && setVariantIdHandler(wishlistProduct.v);
    }, [wishlistPage, wishlistProduct])

    ssr && !wishlistPage && showRandom && changeLocalVariantOnRandom();
    ssr && !wishlistPage && setupVariantIdOnHashmap();

    const productUrl = prepUrlFromConfigSlug(language, pageTypePrefixUrls, pageTypes.productPage, null, url, isMultilanguage, variantId);

    // Wishlist vs Category page
    // In Wishlist Page variation_image is on Root
    // In Category variation_image is in each variation object
    const imagesHolderUrl = wishlistProduct ? wishlistProduct.productData.variation_image :
        variations && variations[variantId] ? variations[variantId].variation_image : null;


    return <div className={`${styles.productItemContainer} ${showPlaceholder ? styles.disable : ''}`}
        onMouseEnter={onHoverHandler} onMouseLeave={onLeaveHandler}>

        {!showPlaceholder && <AddToWishlistSticker
            showLikes={true}
            likes={likes}
            variantId={variantId}
            productId={productId}
        />
        }
        <DivNavLink to={productUrl}>
            <ImageDisplay title={title} imagesHolderUrl={imagesHolderUrl} forceVisual={forceVisual} onHover={onHover} showPlaceholder={showPlaceholder} />
        </DivNavLink>
        {wishlistPage && <ShowAddToCartVariants
            avaibleVariations={variations}
            active={onHover}
            productId={productId}
        />}
        {!wishlistPage && !showPlaceholder && <ShowAvaibleFeatures
            active={onHover}
            currentVariationCode={localVariantCode}
            onClickFunction={changeLocalVariantCode}

        />}
        <DivNavLink to={productUrl}>
            <div className={styles.productDataContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        {showPlaceholder && <Placeholder customWidth={'100%'} />}
                        {!showPlaceholder && titlekey}
                    </div>
                    <div className={styles.subtitle}>
                        {showPlaceholder && <Placeholder customWidth={'50%'} />}
                        {!showPlaceholder && title && cutText(title)}
                    </div>
                    {wishlistPage && <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} />}
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.label}>
                        {!showPlaceholder && translations && translations.priceFrom ? translations.priceFrom : ''}
                    </div>
                    <ShowPrice allPrices={min_price} />
                </div>
            </div>
        </DivNavLink>
    </div>
}
export default withStyles(styles)(ProductItem);
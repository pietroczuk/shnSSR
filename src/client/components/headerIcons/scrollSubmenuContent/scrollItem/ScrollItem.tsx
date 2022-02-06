import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../client";
import withStyles from "isomorphic-style-loader/withStyles";

import styles from './scrollItem.scss'
import { CartProduct } from "../../../../redux/Models/Cart/CartProducts/CartProduct/CartProduct.model";
import { WishlistProduct } from "../../../../redux/Models/Wishlist/WishlistProducts/WishlistProduct/WishlistProduct.model";
import DivNavLink from "../../../divNavLink/DivNavLink";
import { cutText, pageTypes, prepUrlFromConfigSlug } from "../../../../utils/utilsFrondend";
import ShowSelectedAttributes from "../../../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes";
import ShowPrice from "../../../helpers/display/showPrice/ShowPrice";
// import ShowSelectedAttributes from "../../../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes";

interface ScrollItemProps {
    product: WishlistProduct | CartProduct;
    listType: 'wishlist' | 'cart';
    clickHandler?: VoidFunction
}

const ScrollItem: React.FC<ScrollItemProps> = (props) => {
    const { product, clickHandler, listType } = props;
    const { imagesBase, imagesSize, language, pageTypePrefixUrls, isMultilanguage, priceFrom } = useSelector((state: RootState) => ({
        imagesBase: state.SystemConfig.images.url,
        imagesSize: state.SystemConfig.images.small,
        language: state.User.language,
        pageTypePrefixUrls: state.SystemConfig.pageTypePrefixUrls,
        isMultilanguage: state.SystemConfig.isMultilanguage,
        priceFrom: state.PublicConfig.translations.priceFrom
    }), shallowEqual);
    const isWishlist = listType === 'wishlist' ? true : false;

    const imageUrl = imagesBase + '/' + product.productData.variationImage.poster + imagesSize;
    const rawProductUrl = product.productData.url
    const variantId = product.v;
    const productUrl = prepUrlFromConfigSlug(language, pageTypePrefixUrls, pageTypes.productPage, null, rawProductUrl, isMultilanguage, variantId);

    const variations = product.productData.variations;
    const minPrice = { ...product.productData.minPrice };
    const singlePrice = product.productData.minPrice;
    const quantity = product.quantity > 0 ? product.quantity : 1;

    quantity > 1 && Object.entries(minPrice).forEach(([key, price]) => minPrice[key] = (+price * quantity).toString());
    return (
        <DivNavLink to={productUrl} className={styles.item} onClick={clickHandler}>
            <div className={styles.imageHolder}>
                <img src={imageUrl} />
            </div>
            <div className={styles.itemDataHolder}>
                <div className={styles.itemData}>
                    <div className={styles.label}>
                        {product.productData.titlekey}
                    </div>
                    <div className={styles.description}>
                        {cutText(product.productData.title, 20)}
                    </div>
                    <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} customFontSize={0.6} isWishlist={isWishlist} />
                </div>
                <div className={`${styles.priceCont} ${!isWishlist ? styles.minicart : ''}`}>
                    {
                        isWishlist &&
                        <div className={styles.priceLabel}>
                            {priceFrom}
                        </div>
                    }
                    {!isWishlist && quantity > 1 &&
                        <div className={styles.priceLabel}>
                            <ShowPrice allPrices={singlePrice} quantity={quantity} />
                        </div>
                    }
                    <ShowPrice allPrices={minPrice} />
                </div>
            </div>
        </DivNavLink>
    );
}

export default withStyles(styles)(ScrollItem);
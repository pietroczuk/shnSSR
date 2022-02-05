import React from "react";
import { useSelector } from "react-redux";
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
    clickHandler?: VoidFunction
}

const ScrollItem: React.FC<ScrollItemProps> = (props) => {
    const { product, clickHandler } = props;
    const { imagesBase, imagesSize, language, pageTypePrefixUrls, isMultilanguage, priceFrom } = useSelector((state: RootState) => ({
        imagesBase: state.SystemConfig.images.url,
        imagesSize: state.SystemConfig.images.small,
        language: state.User.language,
        pageTypePrefixUrls: state.SystemConfig.pageTypePrefixUrls,
        isMultilanguage: state.SystemConfig.isMultilanguage,
        priceFrom: state.PublicConfig.translations.priceFrom
    }))
    const imageUrl = imagesBase + '/' + product.productData.variation_image.poster + imagesSize;
    const rawProductUrl = product.productData.url
    const variantId = product.v;
    const productUrl = prepUrlFromConfigSlug(language, pageTypePrefixUrls, pageTypes.productPage, null, rawProductUrl, isMultilanguage, variantId);

    const variations = product.productData.variations;
    const min_price = product.productData.min_price;
    return (
        <DivNavLink to={productUrl} className={styles.item} onClick={clickHandler}>
            <div className={styles.imageHolder}>
                <img src={imageUrl} />
            </div>
            <div className={styles.itemDataHolder}>
                <div className={styles.label}>
                    {product.productData.titlekey}
                </div>
                <div className={styles.description}>
                    {cutText(product.productData.title, 20)}
                </div>
                <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} customFontSize={0.6} />

                <div className={styles.priceCont}>
                    <div className={styles.priceLabel}>
                        {priceFrom}
                    </div>
                    <ShowPrice allPrices={min_price} />
                </div>
            </div>
        </DivNavLink>
    );
}

export default withStyles(styles)(ScrollItem);
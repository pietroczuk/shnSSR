import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../client";
import withStyles from "isomorphic-style-loader/withStyles";

import styles from './scrollItem.scss'
import { CartProduct } from "../../../../redux/Models/Cart/CartProducts/CartProduct/CartProduct.model";
import { WishlistProduct } from "../../../../redux/Models/Wishlist/WishlistProducts/WishlistProduct/WishlistProduct.model";
import DivNavLink from "../../../divNavLink/DivNavLink";
import { pageTypes, prepUrlFromConfigSlug } from "../../../../utils/utilsFrondend";
import ShowSelectedAttributes from "../../../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes";
// import ShowSelectedAttributes from "../../../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes";

interface ScrollItemProps {
    product: WishlistProduct | CartProduct
}

const ScrollItem: React.FC<ScrollItemProps> = (props) => {
    const { product } = props;
    const { imagesBase, imagesSize, language, pageTypePrefixUrls, isMultilanguage } = useSelector((state: RootState) => ({
        imagesBase: state.SystemConfig.images.url,
        imagesSize: state.SystemConfig.images.small,
        language: state.User.language,
        pageTypePrefixUrls: state.SystemConfig.pageTypePrefixUrls,
        isMultilanguage: state.SystemConfig.isMultilanguage
    }))
    const imageUrl = imagesBase + '/' + product.productData.variation_image.poster + imagesSize;
    const rawProductUrl = product.productData.url
    const variantId = product.v;
    const productUrl = prepUrlFromConfigSlug(language, pageTypePrefixUrls, pageTypes.productPage, null, rawProductUrl, isMultilanguage, variantId);

    const variations = product.productData.variations;
    return (
        <DivNavLink to={productUrl} className={styles.item}>
            <div className={styles.imageHolder}>
                <img src={imageUrl} />
            </div>
            <div className={styles.itemDataHolder}>
                <div className={styles.label}>
                    {product.productData.titlekey}
                </div>
                <ShowSelectedAttributes selectedVariantId={variantId} avaibleVariations={variations} customFontSize={0.6} />
            </div>
        </DivNavLink>
    );
}

export default withStyles(styles)(ScrollItem);
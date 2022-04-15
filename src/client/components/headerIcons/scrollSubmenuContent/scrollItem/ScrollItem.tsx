import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../client";
import withStyles from "isomorphic-style-loader/withStyles";

import styles from './scrollItem.scss'
import { CartProduct } from "../../../../redux/Models/Cart/CartProducts/CartProduct/CartProduct.model";
import { WishlistProduct } from "../../../../redux/Models/Wishlist/WishlistProducts/WishlistProduct/WishlistProduct.model";
import DivNavLink from "../../../divNavLink/DivNavLink";
import { checkTrueSale, cutText, pageTypes, prepUrlFromConfigSlug } from "../../../../utils/utilsFrondend";
import ShowSelectedAttributes from "../../../helpers/product/productItem/showSelectedAttributes/ShowSelectedAttributes";
import ShowPrice from "../../../helpers/display/showPrice/ShowPrice";
import SaleBadge from "../../../helpers/product/productItem/saleBadge/SaleBadge";
import { updateStoreCartPromoPrice } from "../../../../redux/actionCreators/cart/cart.ac";
import { updateStoreWishlistPromoPrice } from "../../../../redux/actionCreators/wishlist/wishlist.ac";
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
    const { minPrice, salePrice, sale } = product.productData;
    // const minPrice = { ...product.productData.minPrice };
    // const singlePrice = product.productData.minPrice;
    const quantity = product.quantity > 0 ? product.quantity : 1;
    // const sale = product.productData.sale; 

    const showPromo = useSelector((state: RootState) => {
        const now = state.User.today.date
        return checkTrueSale(sale, now)
    });
    const dispatch = useDispatch();
    useEffect(() => {
        !isWishlist && sale.enable && dispatch(updateStoreCartPromoPrice(variantId, showPromo));
        isWishlist && sale.enable && dispatch(updateStoreWishlistPromoPrice(variantId, showPromo));
    }, [showPromo])

    // quantity > 1 && Object.entries(minPrice).forEach(([key, price]) => minPrice[key] = (+price * quantity).toString());
    return (
        <DivNavLink to={productUrl} className={styles.item} onClick={clickHandler}>
            <div className={styles.imageHolder}>
                {showPromo && <SaleBadge sale={sale} />}
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

                            <ShowPrice allPrices={minPrice} salePrice={salePrice} quantity={quantity} showPromo={showPromo} showQuantity={true} />
                        </div>
                    }
                    <ShowPrice allPrices={minPrice} salePrice={salePrice} quantity={quantity} showPromo={showPromo} />
                    {/* <ShowPrice allPrices={minPrice} sale={sale} finalQuantity={quantity}/> */}
                </div>
            </div>
        </DivNavLink>
    );
}

export default withStyles(styles)(ScrollItem);
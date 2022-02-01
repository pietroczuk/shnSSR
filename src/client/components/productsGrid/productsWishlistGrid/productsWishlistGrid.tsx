import React from "react";
import styles from '../productsGrid.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ProductItem from "../../productItem/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../client";

const ProductsWishlistGrid: React.FC = () => {
    const { products } = useSelector((state: RootState) => ({
        products: state.Wishlist.products
    }))

    return <div className={styles.productsGrid}>
        {products && Object.entries(products).map(
            ([_key, val]) => {
                return <ProductItem
                    product={val.productData}
                    key={val.v}
                    imagesInRootVariant={true}
                    wishlistPage={true}
                    wishlistVariantId={val.v}
                />
            })
        }
    </div>
}

export default withStyles(styles)(ProductsWishlistGrid)

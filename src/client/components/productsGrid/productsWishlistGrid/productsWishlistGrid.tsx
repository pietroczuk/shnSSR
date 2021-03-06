import { FC } from "react";
import styles from '../productsGrid.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ProductItem from "../../productItem/ProductItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../client";

const ProductsWishlistGrid: FC = () => {
    const { products } = useSelector((state: RootState) => ({
        products: state.Wishlist.products
    }), shallowEqual)

    return <div className={styles.productsGrid}>
        {products && Object.entries(products).reverse().map(
            ([_key, val]) => {
                return <ProductItem
                    wishlistProduct={val}
                    key={val.v}
                    wishlistPage={true}
                />
            })
        }
    </div>
}

export default withStyles(styles)(ProductsWishlistGrid)

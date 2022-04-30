import { FC } from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './scrollSubmenuContent.scss';
import { RootState } from "../../../client";
import { shallowEqual, useSelector } from "react-redux";
import ScrollItem from "./scrollItem/ScrollItem";
import { CartProducts } from "../../../redux/Models/Cart/CartProducts/CartProducts.model";
import { WishlistProducts } from "../../../redux/Models/Wishlist/WishlistProducts/WishlistProducts.model";

interface ScrollSubmenuContentProps {
    listType: 'wishlist' | 'cart';
    clickHandler?: VoidFunction;
}

const ScrollSubmenuContent: FC<ScrollSubmenuContentProps> = props => {
    const { listType, clickHandler } = props;
    let products: CartProducts | WishlistProducts;

    if (listType === 'wishlist') {
        products = useSelector((state: RootState) => state.Wishlist.products, shallowEqual);
    }
    if (listType === 'cart') {
        products = useSelector((state: RootState) => state.Cart.products, shallowEqual);
    }

    return <div className={styles.scrollContent}>
        {Object.entries(products).reverse().map(([_key, product]) => <ScrollItem product={product} key={product.v} clickHandler={clickHandler} listType={listType} />)}
    </div>
}

export default withStyles(styles)(ScrollSubmenuContent);
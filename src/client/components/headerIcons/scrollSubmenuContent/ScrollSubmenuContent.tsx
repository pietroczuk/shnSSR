import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './scrollSubmenuContent.scss';
import { RootState } from "../../../client";
import { useSelector } from "react-redux";
import ScrollItem from "./scrollItem/ScrollItem";
import { CartProducts } from "../../../redux/Models/Cart/CartProducts/CartProducts.model";
import { WishlistProducts } from "../../../redux/Models/Wishlist/WishlistProducts/WishlistProducts.model";

interface ScrollSubmenuContentProps {
    listType: 'wishlist' | 'cart'
}

const ScrollSubmenuContent: React.FC<ScrollSubmenuContentProps> = props => {
    const { listType } = props;
    let products: CartProducts | WishlistProducts;

    if (listType === 'wishlist') {
        products = useSelector((state: RootState) => state.Wishlist.products);
    }
    if (listType === 'cart') {
        products = useSelector((state: RootState) => state.Cart.products);
    }

    return <div className={styles.scrollContent}>
        {Object.entries(products).map(([_key, product]) => <ScrollItem product={product} key={product.v}/>)}
    </div>
}

export default withStyles(styles)(ScrollSubmenuContent);
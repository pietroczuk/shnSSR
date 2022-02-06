import React from "react";
import styles from '../productsGrid.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ProductItem from "../../productItem/ProductItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../client";

const ProductsCategoryGrid: React.FC = () => {
    const { products, placeholderNumber } = useSelector((state: RootState) => ({
        products: state.Page.data.categoryPage.products,
        placeholderNumber: state.SystemConfig.placeholders.categoryProducts,
    }), shallowEqual)

    return <div className={styles.productsGrid}>
        {Array.isArray(products) ?
            products.map((p, index) => <ProductItem product={p} key={p.id} index={index} />)
            :
            [...Array(placeholderNumber)].map((_el, index) => <ProductItem key={index} />)
        }
    </div>

}
export default withStyles(styles)(ProductsCategoryGrid)

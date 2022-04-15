import React from "react";
import styles from '../productsGrid.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ProductItem from "../../productItem/ProductItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../client";

const ProductsCategoryGrid: React.FC = () => {
    const { products, placeholderNumber, productsLength } = useSelector((state: RootState) => ({
        products: state.Page.data.categoryPage.products,
        productsLength: state.Page.data.categoryPage.length,
        placeholderNumber: state.SystemConfig.placeholders.categoryProducts,
    }), shallowEqual)

    return <div className={styles.productsGrid}>
        {productsLength ? 
            Object.entries(products).map(
                ([_key, val], index) => {
                return <ProductItem
                    product={val}
                    key={val.id}
                    index={index}
                />
                }
            )
            :
            [...Array(placeholderNumber)].map((_el, index) => <ProductItem key={index} />)
        }
    </div>

}
export default withStyles(styles)(ProductsCategoryGrid)

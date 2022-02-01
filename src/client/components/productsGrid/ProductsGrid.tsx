import React from "react";
import styles from './productsGrid.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { PageData } from "../../redux/types/page.types";
import ProductItem from "../productItem/ProductItem";

interface ProductsGridProps {
    category: PageData;
    category_products: number
}

const ProductsGrid: React.FC<ProductsGridProps> = props => {
    const { category, category_products } = props
    const products = category && category.products ? category.products : null;

    return <div className={styles.productsGrid}>
        {products ?
            products.map((p, index) => <ProductItem product={p} key={p.id} index={index} />)
            :
            [...Array(category_products)].map((_el, index) => <ProductItem key={index} />)
        }
    </div>

}
export default withStyles(styles)(ProductsGrid)

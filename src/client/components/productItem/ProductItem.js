import React from 'react';
import { useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

const ProductItem = ({ product }) => {
    const { title, titlekey, variations } = product;
    const { images_url } = useSelector(state => ({ images_url: state.SystemConfig.images }));
    // console.log(product);
    // return <p>aaa</p>;
    return (
        <div className={styles.productItemContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.single} width="300px" height="400px" alt={title} src={images_url.url + '/' + variations[Object.keys(variations)[0]].variation_image.poster + images_url.medium} />
            </div>
            <div className={styles.productDataContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{titlekey}</div>
                    <div className={styles.subtitle}>{title}</div>
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.label}>juz od</div>
                    <div className={styles.price}>20 zł</div>
                </div>
            </div>
        </div>
    )
}
export default withStyles(styles)(ProductItem);
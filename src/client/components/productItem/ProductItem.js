import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { prepareProductLink } from '../../utils/utilsFrondend';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

const ProductItem = ({ product }) => {
    const { title, titlekey, variations, url } = product;
    const { images_url, translation, language, slug_urls } = useSelector(state => ({
        images_url: state.SystemConfig.images,
        language: state.User.language,
        slug_urls: state.SystemConfig.urls.product,
        translation: state.PublicConfig.translation
    }));
    const product_url = prepareProductLink(language, slug_urls, url);
    return <NavLink to={product_url} className={styles.productItemContainer}>
        <div className={styles.imageContainer}>
            <img className={styles.single} width="300px" height="400px" alt={title} src={images_url.url + '/' + variations[Object.keys(variations)[0]].variation_image.poster + images_url.medium} />
        </div>
        <div className={styles.productDataContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>{titlekey}</div>
                <div className={styles.subtitle}>{title}</div>
            </div>
            <div className={styles.priceContainer}>
                <div className={styles.label}>{translation && translation.price_from ? translation.price_from : ''}</div>
                <div className={styles.price}>20 zł</div>
            </div>
        </div>
    </NavLink>
}
export default withStyles(styles)(ProductItem);
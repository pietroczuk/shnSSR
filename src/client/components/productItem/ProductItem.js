import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { prepareProductLink, getPriceByCurrency } from '../../utils/utilsFrondend';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './productItem.scss';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import Blank from '../svg/blank/Blank';
import Placeholder from '../placeholder/Placeholder';

const ProductItemPlaceholder = ({ product }) => {

    const placeholder = product ? false : true;

    const { title, titlekey, variations, url, min_price } = product ? product : {
        title: null,
        titlekey: null,
        variations: null,
        url: null,
        min_price: null
    };

    const multiplyMesurment = 100;
    const { image_width, image_height, images_url, language, userCurrency, currency, slug_urls, translation } = useSelector(state => ({
        image_width: state.SystemConfig.images.aspect_ratio.width * multiplyMesurment,
        image_height: state.SystemConfig.images.aspect_ratio.height * multiplyMesurment,
        images_url: state.SystemConfig.images,
        language: state.User.language,
        userCurrency: state.User.currency,
        currency: state.SystemConfig.currency,
        slug_urls: state.SystemConfig.urls.product,
        translation: state.PublicConfig.translation,
    }));
    const product_url = !placeholder ? prepareProductLink(language, slug_urls, url) : '#';

    return <NavLink to={product_url} className={`${styles.productItemContainer} ${placeholder ? styles.disable : ''}`}>
        <div className={styles.imageContainer}>
            <div className={styles.imageContainerRelative}>
                <div className={styles.imagePicture}>
                    {placeholder && <LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={3} customBorderTopColor={'#f3f3f3'} />}
                    {!placeholder && <img style={{width: '100%', height: 'auto'}} className={styles.single} alt={titlekey} src={images_url.url + '/' + variations[Object.keys(variations)[0]].variation_image.poster + images_url.medium} />}
                </div>
                <div className={styles.imagePlaceholder} >
                    <Blank width={image_width} height={image_height} />
                </div>
            </div>
        </div>
        <div className={styles.productDataContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    {placeholder && <Placeholder customWidth={'100%'} />}
                    {!placeholder && titlekey}
                </div>
                <div className={styles.subtitle}>
                    {placeholder && <Placeholder customWidth={'50%'} />}
                    {!placeholder && title}
                </div>
            </div>
            <div className={styles.priceContainer}>
                <div className={styles.label}>
                    {!placeholder && translation && translation.price_from ? translation.price_from : ''}
                </div>
                <div className={styles.price}>
                    {!placeholder && getPriceByCurrency(min_price, userCurrency, currency)}
                </div>
            </div>
        </div>
    </NavLink>
}
export default withStyles(styles)(ProductItemPlaceholder);
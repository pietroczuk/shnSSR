import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './addToWishlistSticker.scss';
import WishlistIcon from '../../svg/icons/WishlistIcon';
import HeartFull from '../../svg/icons/HeartFull';

import { useSelector, useDispatch } from 'react-redux';
import { addToStoreWishlist } from '../../../redux/actions/actionCreators';

const AddToWishlistSticker = ({ visualMode = false, showLikes = false, likes, variantId, productData }) => {
    const dispatch = useDispatch();
    const { localstorageWishlistKey, wishlistProducts } = useSelector(state => ({
        localstorageWishlistKey: state.SystemConfig.localstorage_keys.wishlist,
        wishlistProducts: state.Wishlist.products,
    }))
    const clickHandler = () => {
        variantId && productData && dispatch(addToStoreWishlist(productData, variantId, localstorageWishlistKey));
    }
    const inWishList = wishlistProducts[variantId] !== undefined ? true : false;
    return <div className={`${styles.addToWishContainer} ${visualMode ? styles.visualMode : ''}`} onClick={clickHandler}>
        <div className={styles.iconContainer}>
            {inWishList ? <HeartFull /> : <WishlistIcon />}
            {visualMode && <div className={styles.iconBg}></div>}
        </div>
        {showLikes && <div className={styles.counter}>{inWishList ? likes + 1 : likes}</div>}
    </div>;
}
export default withStyles(styles)(AddToWishlistSticker);
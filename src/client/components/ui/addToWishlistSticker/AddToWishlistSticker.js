import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './addToWishlistSticker.scss';
import WishlistIcon from '../../svg/icons/WishlistIcon';
import HeartFull from '../../svg/icons/HeartFull';

const AddToWishlistSticker = ({ visualMode = false, likes, inWishlist = false, clickHandler }) => {
    return <div className={`${styles.addToWishContainer} ${visualMode ? styles.visualMode : ''}`} onClick={clickHandler}>
        <div className={styles.iconContainer}>
            {inWishlist ? <HeartFull /> : <WishlistIcon />}
            {visualMode && <div className={styles.iconBg}></div>}
        </div>
        <div className={styles.counter}>{likes}</div>
    </div>;
}
export default withStyles(styles)(AddToWishlistSticker);
import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './addToWishlistSticker.scss';
import WishlistIcon from '../../../svg/icons/WishlistIcon';
import HeartFull from '../../../svg/icons/HeartFull';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../client';
import { addToStoreWishlist } from '../../../../redux/actionCreators/wishlist/wishlist.ac';

interface Props {
    showLikes?: boolean,
    likes?: number,
    variantId: string,
    productId: string,
    forceVisualMode?: boolean,
    cssClass?: string,
    whiteIcon?: boolean
}

const AddToWishlistSticker: FC<Props> = props => {
    const { showLikes, likes, variantId, productId, forceVisualMode, cssClass, whiteIcon } = props;
    const dispatch = useDispatch();
    const { api, lang, localstorageWishlistKey, wishlistProducts, showVisual } = useSelector((state: RootState) => ({
        api: state.SystemConfig.api,
        lang: state.User.language,
        localstorageWishlistKey: state.SystemConfig.localstorageKeys.wishlist,
        wishlistProducts: state.Wishlist.products,
        showVisual: state.Display.showVisual
    }), shallowEqual)
    const alreadyInWishlist = wishlistProducts[variantId] ? true : false;
    const clickHandler = () => {
        // console.log('click', productId, variantId, alreadyInWishlist);
        variantId && productId && dispatch(addToStoreWishlist(api, lang, productId, variantId, localstorageWishlistKey, alreadyInWishlist));
    }

    const showVisualMode = forceVisualMode !== undefined ? forceVisualMode : showVisual;

    return <div className={
        `${styles.addToWishContainer} 
        ${showVisualMode ? styles.visualMode : ''}
        ${cssClass ? cssClass : ''}
        `} onClick={clickHandler}>
        <div className={`${styles.iconContainer} ${alreadyInWishlist ? styles.fullOpacity : ''} ${whiteIcon ? styles.lightIcon : ''}`}>
            {alreadyInWishlist ? <HeartFull /> : <WishlistIcon />}
            {showVisual && <div className={styles.iconBg}></div>}
        </div>
        {showLikes && <div className={styles.counter}>{alreadyInWishlist ? likes + 1 : likes}</div>}
    </div>;
}
export default withStyles(styles)(AddToWishlistSticker);
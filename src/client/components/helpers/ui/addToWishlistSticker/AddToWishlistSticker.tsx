import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './addToWishlistSticker.scss';
import WishlistIcon from '../../../svg/icons/WishlistIcon';
import HeartFull from '../../../svg/icons/HeartFull';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addToStoreWishlist } from '../../../../redux/actions/actionCreators';
import { RootState } from '../../../../client';

interface Props {
    showLikes: boolean,
    likes: number,
    variantId: string,
    productId: string
}

const AddToWishlistSticker: FC<Props> = props => {
    const { showLikes = false, likes, variantId, productId } = props;
    const dispatch = useDispatch();
    const { api, lang, localstorageWishlistKey, wishlistProducts, showVisual } = useSelector((state: RootState) => ({
        api: state.SystemConfig.api,
        lang: state.User.language,
        localstorageWishlistKey: state.SystemConfig.localstorageKeys.wishlist,
        wishlistProducts: state.Wishlist.products,
        showVisual: state.Display.showVisual
    }), shallowEqual)
    const inWishList = wishlistProducts[variantId] ? true : false;
    const clickHandler = () => {
        console.log('click', productId, variantId, inWishList);
        variantId && productId && dispatch(addToStoreWishlist(api, lang, productId, variantId, localstorageWishlistKey, inWishList));
    }
    return <div className={`${styles.addToWishContainer} ${showVisual ? styles.visualMode : ''}`} onClick={clickHandler}>
        <div className={`${styles.iconContainer} ${inWishList ? styles.fullOpacity : ''}`}>
            {inWishList ? <HeartFull /> : <WishlistIcon />}
            {showVisual && <div className={styles.iconBg}></div>}
        </div>
        {showLikes && <div className={styles.counter}>{inWishList ? likes + 1 : likes}</div>}
    </div>;
}
export default withStyles(styles)(AddToWishlistSticker);
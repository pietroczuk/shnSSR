import React, { useEffect, useState } from 'react';
import DivNavLink from '../divNavLink/DivNavLink';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import { pageTypes } from '../../utils/utilsFrondend';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { RootState } from '../../client';
import { checkWishlist } from '../../redux/actionCreators/wishlist/wishlist.ac';
import { checkCart } from '../../redux/actionCreators/cart/cart.ac';

import AssitiveText from '../helpers/display/assitiveText/AssitiveText';
import WishlistSubmenu from '../headerIcons/wishlistSubmenu/WishlistSubmenu';
import CartSubmenu from '../headerIcons/cartSubmenu/CartSubmenu';

interface InteractiveIconProps {
    isDarkBackground: boolean
    isHoverBackground?: boolean
    isHoverOpacity?: boolean
    customWidth?: number
    customSvgSize?: number
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    linkPageType?: string
}

const InteractiveIcon: React.FC<InteractiveIconProps> = (props) => {
    const { language, isMultilanguage, specialPagesUrlsArray, translations, isMobile } =
        useSelector((state: RootState) => ({
            language: state.User.language,
            isMultilanguage: state.SystemConfig.isMultilanguage,
            specialPagesUrlsArray: state.SystemConfig.specialPagesUrlsArray,
            translations: state.PublicConfig.translations,
            isMobile: state.Display.isMobile
        }), shallowEqual);
    const {
        isDarkBackground,
        isHoverBackground,
        isHoverOpacity,
        customWidth,
        customSvgSize,
        onMouseEnter,
        onMouseLeave,
        onClick,
        linkPageType
    } = props;

    const [showSubmenu, setShowSubmenu] = useState(false);

    const setShowSubmenuOpen = () => {
        // setShowSubmenu(true);
    }
    const setShowSubmenuClose = () => {
        // setShowSubmenu(false);
    }
    const toogleShowMenu = () => {
        setShowSubmenu(prevState => !prevState);
    }

    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;

    const rawSlug = linkPageType && specialPagesUrlsArray[linkPageType][language];
    const linkUrl = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage) : undefined;

    const isLinkingToWishlist = linkPageType === pageTypes.wishlist;
    const isLinkingToCart = linkPageType === pageTypes.cart;


    let badgeNumber = 0;
    let localstorageKey = null;
    let apiConfig = null;

    const dispatch = useDispatch();

    if (isLinkingToCart) {
        const { api, cartLocalstorageKey, cartLength } = useSelector((state: RootState) => ({
            api: state.SystemConfig.api,
            cartLocalstorageKey: state.SystemConfig.localstorageKeys.cart,
            cartLength: state.Cart.length
        }), shallowEqual);

        badgeNumber = cartLength;
        localstorageKey = cartLocalstorageKey;
        apiConfig = api;
    }

    if (isLinkingToWishlist) {
        const { api, wishlistLocalStorageKey, wishlistLenght } = useSelector((state: RootState) => ({
            api: state.SystemConfig.api,
            wishlistLocalStorageKey: state.SystemConfig.localstorageKeys.wishlist,
            wishlistLenght: state.Wishlist.length
        }), shallowEqual);

        badgeNumber = wishlistLenght;
        localstorageKey = wishlistLocalStorageKey;
        apiConfig = api;
    }
    useEffect(() => {
        if (isLinkingToCart) {
            dispatch(checkCart(localstorageKey, null, apiConfig, language));
        }
        if (isLinkingToWishlist) {
            dispatch(checkWishlist(localstorageKey, null, apiConfig, language));
        }
    }, []);

    const showBadge = badgeNumber > 0;

    const enableHoverHandlers = (isLinkingToCart || isLinkingToWishlist) && !isMobile;

    const isWishlistSubmenuVisible = showSubmenu && isLinkingToWishlist ? true : false;
    const isCartSubmenuVisible = showSubmenu && isLinkingToCart ? true : false;
    return (
        <div className={styles.iconHolder}
            onClick={enableHoverHandlers ? toogleShowMenu : onClick}
            onMouseEnter={enableHoverHandlers ? setShowSubmenuOpen : onMouseEnter}
            onMouseLeave={enableHoverHandlers ? setShowSubmenuClose : onMouseLeave}
        >
            <DivNavLink to={linkUrl}
                className={`
                    ${styles.icon} 
                    ${isDarkBackground ? styles.whiteIcon : ''}
                    ${isHoverBackground ? styles.iconHover : ''}
                    ${isHoverOpacity ? styles.iconOpacity : ''}
                    `}
                style={{
                    width: width + 'px'
                }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <AssitiveText>{linkPageType && translations[linkPageType]}</AssitiveText>

                <div className={styles.svgContener}
                    style={{
                        maxWidth: svgSize + 'px',
                        maxHeight: svgSize + 'px',
                    }}>
                    {showBadge && <div className={styles.badge}>{badgeNumber}</div>}
                    {props.children}
                </div>
            </DivNavLink>
            {isWishlistSubmenuVisible && <WishlistSubmenu parrentWidth={width} />}
            {isCartSubmenuVisible && <CartSubmenu parrentWidth={width} />}
        </div>
    )
}
export default withStyles(styles)(InteractiveIcon);
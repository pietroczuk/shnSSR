import React, { useEffect } from 'react';
import DivNavLink from '../divNavLink/DivNavLink';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import { pageTypes } from '../../utils/utilsFrondend';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkWishlist } from '../../redux/actions/actionCreators';
import AssitiveText from '../helpers/display/assitiveText/AssitiveText';

import { RootState } from '../../client';

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
    const { language, isMultilanguage, specialPagesUrlsArray, translation } =
        useSelector((state: RootState) => ({
            language: state.User.language,
            isMultilanguage: state.SystemConfig.multilanguage,
            specialPagesUrlsArray: state.SystemConfig.special_pages_urls,
            translation: state.PublicConfig.translation
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
    
    let badgeNumber = 0;
    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;

    const rawSlug = linkPageType && specialPagesUrlsArray[linkPageType][language];
    const linkUrl = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage) : undefined;

    const isLinkingToWishlist = linkPageType === pageTypes.wishlist;

    if (isLinkingToWishlist) {
        badgeNumber = useSelector((state: RootState) => state.Wishlist.length, shallowEqual);
        const { api, initLocalstorageWishlistKey } = useSelector((state: RootState) => ({
            api: state.SystemConfig.api,
            initLocalstorageWishlistKey: state.SystemConfig.localstorage_keys.wishlist,
        }), shallowEqual);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(checkWishlist(initLocalstorageWishlistKey, null, api, language));
        }, [])
    }

    const showBadge = badgeNumber > 0;

    return (
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
            <AssitiveText>{linkPageType && translation[linkPageType]}</AssitiveText>

            <div className={styles.svgContener}
                style={{
                    maxWidth: svgSize + 'px',
                    maxHeight: svgSize + 'px',
                }}>
                {showBadge && <div className={styles.badge}>{badgeNumber}</div>}
                {props.children}
            </div>
        </DivNavLink>
    )
}
export default withStyles(styles)(InteractiveIcon);
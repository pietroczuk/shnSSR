import React, { useEffect } from 'react';
import DivNavLink from '../DivNavLink/DivNavLink';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import { pageTypes } from '../../utils/utilsFrondend';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkWishlist } from '../../redux/actions/actionCreators';

const InteractiveIcon = (props) => {
    const { language, multilanguage, special_pages_urls } = useSelector(state => ({
        language: state.User.language,
        multilanguage: state.SystemConfig.multilanguage,
        special_pages_urls: state.SystemConfig.special_pages_urls,
    }), shallowEqual);
    const {
        white,
        hoverBg,
        hoverOpacity,
        customWidth,
        customSvgSize,
        // badgeNumber = 0,
        onMouseEnter,
        onMouseLeave,
        onClick,
        // special_pages_urls = null,
        // language,
        // multilanguage,
        type
    } = props;
    let badgeNumberDisplay = 0;
    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;
    // console.log(special_pages_urls, type);
    const link_url_type = type && special_pages_urls[type][language]
    const link_url = link_url_type ? prepUrlFromConfigSlug(language, null, null, null, link_url_type, multilanguage) : null;

    if (type === pageTypes.wishlist) {
        badgeNumberDisplay = useSelector(state => state.Wishlist.length, shallowEqual);
        const { api, initLocalstorageWishlistKey } = useSelector(state => ({
            api: state.SystemConfig.api,
            initLocalstorageWishlistKey: state.SystemConfig.localstorage_keys.wishlist,
        }), shallowEqual);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(checkWishlist(initLocalstorageWishlistKey, null, api, language));
        }, [])
    }

    return (
        <DivNavLink to={link_url}
            className={`
            ${styles.icon} 
            ${white ? styles.whiteIcon : ''}
            ${hoverBg ? styles.iconHover : ''}
            ${hoverOpacity ? styles.iconOpacity : ''}
            `}
            style={{
                width: width + 'px'
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={styles.svgContener}
                style={{
                    maxWidth: svgSize + 'px',
                    maxHeight: svgSize + 'px',
                }}>
                {badgeNumberDisplay > 0 && <div className={styles.badge}>{badgeNumberDisplay}</div>}
                {props.children}
            </div>
        </DivNavLink>
    )
}
export default withStyles(styles)(InteractiveIcon);
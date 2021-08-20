import React, { useEffect, useRef } from 'react';
import styles from './leftMenuLinks.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import LeftMenuSubmenu from './leftMenuSubmenu/LeftMenuSubmenu';

const LeftMenuLinks = (props) => {
    const { menu_items, slug_urls, language, location, main_ref } = props;
    const pathname = location !== undefined ? location.pathname : '';

    // const [menuStyle, setMenuStyle]

    const prepareSubmenu = (elem) => {
        return <LeftMenuSubmenu
            elem={elem}
            pathname={pathname}
            slug_urls={slug_urls}
            language={language}
            prepareLabelMenu={prepareLabelMenu}
            prepareMenuLink={prepareMenuLink}
        />
    }
    const prepareMenuLink = (elem, clickHandler = null) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, url)
            const active_link = new_url === pathname ? styles.active : '';
            return (
                <Link to={new_url} className={`${active_link + ' ' + styles.side_link_container}`} onClick={clickHandler}>
                    {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
                </Link>
            )
        } else {
            return items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color);
        }
    }
    const prepareLabelMenu = (label, color = null, expand = false, bolder = false) => {
        const customColor = !color ? color : { color: color };
        return <div style={customColor} className={`${styles.side_label} ${expand ? styles.side_link_container : ''} ${bolder ? styles.bolder : ''}`}>{label}</div>
    }

    const menu_ref = useRef();

    let scrollingIntervalId = null;
    let wait = 150;
    let prev_window_scroll = 0;
    let stickyBottom = false;

    const setPosition = (forceStatic = false) => {
        // init scroll direction
        const window_scroll = window.pageYOffset;
        const scroll_offset = window_scroll - prev_window_scroll;
        prev_window_scroll = window_scroll;
        // init containers
        const container = menu_ref.current;
        const cointanerViewport = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const main_height = main_ref ? main_ref.current.getBoundingClientRect().height : 0;
        const topHeadline = main_ref ? main_ref.current.offsetTop : 0;
        const bottomHeadline = main_height + topHeadline;
        const maxScroll = bottomHeadline - windowHeight;
        // isRoomForScrolling for tells is room to scroll
        const isRoomForScrolling = cointanerViewport.height + cointanerViewport.y <= windowHeight ? false : true;
        // stores current y position in window
        const userScroll = window_scroll + cointanerViewport.y;
        const maxUserScroll = bottomHeadline - cointanerViewport.height;
        // safety feature - too much scroll bottom
        const safetyBottomTrigger = userScroll <= maxUserScroll ? false : true
        const currentAbsoluteStickyPossition = safetyBottomTrigger ? maxUserScroll : userScroll;
        // is menu bigger than window ?
        const containerIsBiggerThanWindow = cointanerViewport.height < windowHeight ? false : true;
        // is menu bigger than main content ?
        const containerIsBiggerThanMain = cointanerViewport.height > main_height ? true : false;
        // is the same height ? 
        const containerIsSameHeightAsMain = cointanerViewport.height === main_height ? true : false;
        const goingUp = scroll_offset < 0 && window_scroll > 0 ? true : false;
        const goingDown = scroll_offset > 0 && window_scroll > 0 ? true : false;
        // styles
        const staticStyle = {
            position: 'static',
            top: null,
            bottom: null
        }
        const stickyStyle = {
            position: 'sticky',
            top: 0,
            bottom: null
        }
        const absoluteStyle = {
            position: 'absolute',
            top: currentAbsoluteStickyPossition + 'px',
            bottom: null
        }
        const fixedBottomStyle = {
            position: 'fixed',
            top: null,
            bottom: 0
        }
        let newStyles = null;

        if (forceStatic || safetyBottomTrigger) {
            if (safetyBottomTrigger) {
                newStyles = absoluteStyle;
            } else {
                newStyles = staticStyle;
            }
            stickyBottom = false;
        } else {
            if (!containerIsSameHeightAsMain && !containerIsBiggerThanMain) {
                if (goingDown) {
                    if (containerIsBiggerThanWindow) {
                        if (isRoomForScrolling) {
                            if (window_scroll > topHeadline && cointanerViewport.y <= 0) {
                                newStyles = absoluteStyle;
                                stickyBottom = false;
                            } else {
                                newStyles = staticStyle;
                                stickyBottom = false;
                            }
                        } else {
                            if (window_scroll < maxScroll) {
                                newStyles = fixedBottomStyle;
                                stickyBottom = true;
                            } else {
                                newStyles = absoluteStyle;
                                stickyBottom = false;
                            }
                        }
                    } else {
                        newStyles = stickyStyle;
                        stickyBottom = false;
                    }

                }
                if (goingUp) {
                    if (stickyBottom) {
                        newStyles = absoluteStyle;
                        stickyBottom = false;
                    } else {
                        if (cointanerViewport.y >= 0 && window_scroll > topHeadline) {
                            newStyles = stickyStyle;
                            stickyBottom = false;
                        } else {
                            if (window_scroll <= topHeadline) {
                                newStyles = staticStyle;
                                stickyBottom = false;
                            }
                        }
                    }
                }
            } else {
                if (containerIsSameHeightAsMain) {
                    newStyles = staticStyle;
                } else {
                    newStyles = stickyStyle;
                }
                stickyBottom = false;
            }
            if (!goingUp && !goingDown && window_scroll === 0) {
                newStyles = staticStyle;
                stickyBottom = false;
            }
        }
        if (newStyles) {
            container.style.position = newStyles.position;
            container.style.top = newStyles.top;
            container.style.bottom = newStyles.bottom;
        }
        scrollingIntervalId = null;
    }
    useEffect(() => {
        const handleScroll = () => {
            if (scrollingIntervalId === null) {
                scrollingIntervalId = setTimeout(setPosition, wait);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            if (!scrollingIntervalId) {
                clearInterval(scrollingIntervalId);
            }
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);
    useEffect(() => {
        setPosition(true);
    }, [location.pathname]);

    return <nav ref={menu_ref} className={styles.container}>
        <ul className={styles.side_list}>
            {menu_items && menu_items.map((elem, index) =>
                <li key={index}>
                    {prepareMenuLink(elem)}
                </li>
            )}
        </ul>
    </nav>
}

const mapStateToProps = state => ({
    menu_items: state.global.menu.side === 'top' ? state.global.menu.top : state.global.menu.side,
    language: state.user.language,
    slug_urls: state.config.urls,
});
export default
    connect(mapStateToProps, {})
        (withStyles(styles)(LeftMenuLinks))

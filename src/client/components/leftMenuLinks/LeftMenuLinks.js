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
    let wait = 100;
    let prev_window_scroll = 0;
    let stickyBottom = false;

    const setPosition = () => {
        // init scroll direction
        const window_scroll = window.pageYOffset;
        const scroll_offset = window_scroll - prev_window_scroll;
        prev_window_scroll = window_scroll;
        // init containers
        const container = menu_ref.current;
        const cointanerViewport = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // isRoomForScrolling for tells is room to scroll
        const isRoomForScrolling = cointanerViewport.height + cointanerViewport.y <= windowHeight ? false : true;
        // stores current y position in window
        const currentAbsoluteStickyPossition = window_scroll + cointanerViewport.y;
        // is menu bigger than window ?
        const containerIsBiggerThanWindow = cointanerViewport.height < windowHeight ? false : true;
        // is menu bigger than main content ?
        const containerIsBiggerThanMain = main_ref ? cointanerViewport.height > main_ref.current.getBoundingClientRect().height ? true : false : false;
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
        if (!containerIsBiggerThanMain) {
            if (goingDown) {
                if (containerIsBiggerThanWindow) {
                    if (isRoomForScrolling) {
                        newStyles = absoluteStyle;
                        stickyBottom = false;
                    } else {
                        newStyles = fixedBottomStyle;
                        stickyBottom = true;
                    }
                } else {
                    newStyles = stickyStyle;
                    stickyBottom = false;
                }
            }
            if (goingUp) {
                if (cointanerViewport.y >= 0) {
                    newStyles = stickyStyle;
                    stickyBottom = false;
                } else {
                    if (isRoomForScrolling || stickyBottom) {
                        newStyles = absoluteStyle;
                        stickyBottom = false;
                    }
                }
            }
        }
        if (!goingUp && !goingDown && window_scroll === 0 && containerIsBiggerThanMain) {
            newStyles = stickyStyle;
            newStyles = staticStyle;
            stickyBottom = false;
            
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
        // setPosition();
        window.addEventListener('scroll', handleScroll);
        return () => {
            if (!scrollingIntervalId) {
                clearInterval(scrollingIntervalId);
            }
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);
    useEffect(() => {
        setPosition();
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

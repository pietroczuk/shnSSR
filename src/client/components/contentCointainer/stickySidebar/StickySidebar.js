import React, { useEffect, useState, useRef } from 'react';
import styles from '../contentCointainer.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';


const StickySidebar = props => {

    const [forcePosition, setForcePosition] = useState(true);
    const setForcePositionHandler = force => {
        setForcePosition(force);
    }
    const sidebar_ref = useRef();
    const { main_ref, location } = props;

    const pathname = location ? location.pathname : null;
    // variables for prevent rendering when change position
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
        const container = sidebar_ref.current;
        const cointanerViewport = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const main_height = main_ref.current.getBoundingClientRect().height;
        const topHeadline = main_ref.current.offsetTop;
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
        if (main_ref !== undefined && main_ref.current !== undefined) {
            const handleScroll = () => {
                if (scrollingIntervalId === null) {
                    scrollingIntervalId = setTimeout(setPosition, wait);
                }
            }
            setPosition();
            window.addEventListener('scroll', handleScroll);
            return () => {
                if (!scrollingIntervalId) {
                    clearInterval(scrollingIntervalId);
                }
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [main_ref]);
    useEffect(() => {
        if (main_ref !== undefined && main_ref.current !== undefined) {
            setPosition(!forcePosition);
            if (forcePosition) {
                setForcePositionHandler(false);
            }
        }
    }, [pathname, main_ref]);

    return <div className={styles.sidebar_column}>
        <div className={styles.container} ref={sidebar_ref}>{props.children}</div>
    </div>
}
export default withStyles(styles)(StickySidebar);
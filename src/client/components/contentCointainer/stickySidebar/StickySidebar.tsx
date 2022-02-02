import { FC, useEffect, useState, useRef, useContext } from 'react';
import styles from '../contentCointainer.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import ContenerContext from '../contenerContext/contenerContext';

type Styles = {
    position: string,
    top: string,
    bottom: string
}

interface StickySidebarProps {
    location : Location | any;
}

const StickySidebar: FC<StickySidebarProps> = props => {

    const [forcePosition, setForcePosition] = useState(true);
    const setForcePositionHandler = (force: boolean) => {
        setForcePosition(force);
    }
    // read context for main ref
    const contenerContext = useContext(ContenerContext);
    const main_ref = contenerContext.mainContentRef;
    const sidebar_ref = useRef<HTMLDivElement>(null);

    const { location } = props;
    const pathname = location ? location.pathname : null;
    // variables for prevent rendering when change position
    let isUserScrolling = false;
    let prev_window_scroll = 0;
    let stickyBottom = false;
    let prevStyle: null | string = null;

    const setPosition = (forceStatic = false) => {
        // init scroll direction
        const window_scroll = window.pageYOffset;
        const scroll_offset = window_scroll - prev_window_scroll;
        prev_window_scroll = window_scroll;
        // init containers
        const container = sidebar_ref.current;
        if (!container) {
            isUserScrolling = false;
            return;
        }
        const cointanerViewport = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const main_height = main_ref!.current!.getBoundingClientRect().height;
        const topHeadline = main_ref!.current!.offsetTop;
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

        const staticStyle: Styles = {
            position: 'static',
            top: '',
            bottom: ''
        }
        const stickyStyle: Styles = {
            position: 'sticky',
            top: '0px',
            bottom: ''
        }
        const absoluteStyle: Styles = {
            position: 'absolute',
            top: currentAbsoluteStickyPossition + 'px',
            bottom: ''
        }
        const fixedBottomStyle: Styles = {
            position: 'fixed',
            top: '',
            bottom: '0px'
        }
        let newStyles: Styles | null = null;

        if (forceStatic || safetyBottomTrigger) {
            if (safetyBottomTrigger) {
                newStyles = absoluteStyle;
            } else {
                newStyles = staticStyle;
                prevStyle = null;
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
        if (newStyles && (prevStyle !== newStyles.position)) {
            // console.log('style changed', prevStyle, ' => ', newStyles.position, prevStyle !== newStyles.position);
            prevStyle = newStyles.position;
            container.style.position = newStyles.position;
            container.style.top = newStyles.top;
            container.style.bottom = newStyles.bottom;
        }
        isUserScrolling = false;
    }
    useEffect(() => {
        if (main_ref && main_ref.current) {
            const handleScroll = () => {
                if (!isUserScrolling) {
                    isUserScrolling = true;
                    setPosition();
                }
            }
            setPosition();
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        } else {
            return () => {};
        }

    }, [main_ref]);
    useEffect(() => {
        if (main_ref && main_ref.current) {
            setPosition(!forcePosition);
            if (forcePosition) {
                setForcePositionHandler(false);
            }
        }
    }, [pathname, main_ref]);

    return <aside className={styles.sidebar_column}>
        {/* {console.log('render')} */}
        <div className={styles.container} ref={sidebar_ref}>{props.children}</div>
    </aside>
}
export default withStyles(styles)(StickySidebar);
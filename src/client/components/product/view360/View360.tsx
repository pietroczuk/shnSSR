import { FC, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import styles from './view360.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { isScrolledIntoView } from "../../../utils/utilsFrondend";

interface View360Props {
    imgSrc: string;
}

const View360: FC<View360Props> = props => {
    const { imgSrc } = props;
    const panoramaCointaner = useRef<HTMLDivElement>(null);

    const [sliderConfig, setSliderConfig] = useState({
        index: 0,
        maxWidth: 600,
        maxHeight: 600,
        size: 0,
        offsetX: 0,
        count: 24,
        countDown: false,
        perRow: 4,
        speed: 50,
        dragTolerance: 10,
        scrollingTimeoutId: null,
    });
    /**
     * use array for capture zoom in and out in browser
     * overtise we will have random intervals played
     * this becomes from deley on update state and naure od eventlisteners scroll
     */
    const [intervalId, setIntervalId] = useState([]);

    const [scrollingTimeoutIdWindow, setScrollingTimeoutId] = useState(null);

    useEffect(() => {
        if (panoramaCointaner) {
            const contenerSize = panoramaCointaner.current.getBoundingClientRect();
            setSliderConfig(prevState => ({ ...prevState, size: contenerSize.width, offsetX: contenerSize.x }));
            const isVisible = isScrolledIntoView(panoramaCointaner);
            isVisible && playAnimation();
        }
    }, [panoramaCointaner]);

    useEffect(() => {
        const handleWindowScroll = () => {
            stopAnimation();
            const isVisible = isScrolledIntoView(panoramaCointaner);
            const timeoutMiliseconds = 200;
            scrollingTimeoutIdWindow && window.clearTimeout(scrollingTimeoutIdWindow);

            // if (isVisible) {
            //     // stopAnimation();
            //     playAnimation();
            // }else{
            //     stopAnimation();
            // }
            // playAnimation();

            // if (isVisible) {
            //     //     // stopAnimation();
            //         playAnimation();
            //     }else{
            //         stopAnimation();
            //     }

            if (isVisible) {
                const newscrollingTimeoutId = setTimeout(() => {
                    playAnimation();
                    // stopAnimation();
                    // if (isVisible) {
                    //     //     // stopAnimation();
                    //     playAnimation();
                    // } 
                    // else {
                    //     stopAnimation();
                    // }


                    console.log('stop window scroll', newscrollingTimeoutId, intervalId, isVisible);
                }, timeoutMiliseconds);
                setScrollingTimeoutId(newscrollingTimeoutId);
            }
            // else{
            //     // stopAnimation();
            //     playAnimation();
            // }
        }
        window.addEventListener('scroll', handleWindowScroll, { passive: true });
        return () => {
            stopAnimation();
            window.removeEventListener('scroll', handleWindowScroll)
        }
    }, [scrollingTimeoutIdWindow, intervalId]);

    const stopAllAnimationIntervals = () => {
        if (intervalId.length) {
            intervalId.forEach(elem => clearInterval(elem));
        }
    }
    const animate360View = () => {
        setSliderConfig(prevState => {
            if (!prevState.countDown) {
                if (prevState.index + 1 < prevState.count) {
                    return { ...prevState, index: prevState.index + 1 }
                } else {
                    return { ...prevState, countDown: true }
                }
            } else {
                if (prevState.index > 0) {
                    return { ...prevState, index: prevState.index - 1 }
                } else {
                    return { ...prevState, countDown: false }
                }
            }
        });
    }
    const playAnimation = () => {
        stopAllAnimationIntervals();
        const localIntervalId = setInterval(
            () => animate360View(),
            sliderConfig.speed
        );
        setIntervalId([localIntervalId]);
    }
    const stopAnimation = () => {
        stopAllAnimationIntervals();
        intervalId.length && setIntervalId([]);
    }

    const gotoAndPlayFrame = (nextFrame: number) => {
        const currentFrame = sliderConfig.index;

        if (nextFrame > currentFrame) {
            setSliderConfig(prevState => ({ ...prevState, index: prevState.index + 1 }));

        } else {
            if (currentFrame !== nextFrame) {
                setSliderConfig(prevState => ({ ...prevState, index: prevState.index - 1 }));
            }
        }
    }

    const mouseOverHandler = () => {
        stopAnimation();
    }
    const mauseOutHandler = () => {
        playAnimation();
    }

    const mouseMoveHandler = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {

        const panoramaWidth = sliderConfig.size;
        const panoramaOffsetX = sliderConfig.offsetX;
        const panoramaRealScreenWidth = panoramaOffsetX + panoramaWidth;

        const count = sliderConfig.count;
        const tolerance = sliderConfig.dragTolerance;

        const mouseX = 'touches' in event ? event.touches[0].pageX : event.pageX;

        if (mouseX > panoramaOffsetX - tolerance && mouseX < panoramaRealScreenWidth + tolerance) {
            let newFrame = ((mouseX - panoramaOffsetX) / panoramaWidth);
            newFrame = Math.round(count * newFrame);
            if (newFrame > 0 && newFrame < count) {
                gotoAndPlayFrame(newFrame);
            }
        }
    }

    const bgX = -(sliderConfig.index % sliderConfig.perRow) * sliderConfig.size + 'px';
    const bgY = -Math.floor(sliderConfig.index / sliderConfig.perRow) * sliderConfig.size + 'px';

    return <div className={styles.panoramaViewCointaner}
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mauseOutHandler}
        onMouseMove={mouseMoveHandler}
        onTouchStart={mouseOverHandler}
        onTouchEnd={mauseOutHandler}
        onTouchMove={mouseMoveHandler}
    >
        <div ref={panoramaCointaner} className={styles.panoramaCointaner}
            style={{
                backgroundImage: "url(" + imgSrc + ")",
                backgroundPositionX: bgX,
                backgroundPositionY: bgY,
                backgroundSize: sliderConfig.perRow * 100 + '%',
                maxWidth: sliderConfig.maxWidth,
                maxHeight: sliderConfig.maxHeight,
                width: sliderConfig.size ? sliderConfig.size : 'auto',
                height: sliderConfig.size ? sliderConfig.size : 'auto',
            }}>
        </div>
    </div>
}
export default withStyles(styles)(View360);
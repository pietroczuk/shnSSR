import { FC, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import styles from './view360.scss';
import withStyles from "isomorphic-style-loader/withStyles";

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

    const [intervalId, setIntervalId] = useState(null);

    const [scrollingTimeoutIdWindow, setScrollingTimeoutId] = useState(null);

    useEffect(() => {
        if (panoramaCointaner) {
            const contenerSize = panoramaCointaner.current.getBoundingClientRect();
            setSliderConfig(prevState => ({ ...prevState, size: contenerSize.width, offsetX: contenerSize.x }));
        }
    }, [panoramaCointaner]);

    useEffect(() => {
        const handleWindowScroll = () => {
            stopAnimation();
            // console.log('start window scroll', scrollingTimeoutIdWindow);
            const timeoutMiliseconds = 100;
            scrollingTimeoutIdWindow && window.clearTimeout(scrollingTimeoutIdWindow);
            const newscrollingTimeoutId = setTimeout(() => {
                setScrollingTimeoutId(null);
                // console.log('stop window scroll', newscrollingTimeoutId);
                playAnimation();
            }, timeoutMiliseconds);
            setScrollingTimeoutId(newscrollingTimeoutId);
        }
        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll)
        }
    }, [scrollingTimeoutIdWindow]);

    useEffect(() => {
        playAnimation();
        return () => {
            stopAnimation();
        }
    }, []);

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
        if (!intervalId) {
            const localIntervalId = setInterval(
                () => animate360View(),
                sliderConfig.speed
            );
            setIntervalId(localIntervalId);
            // console.log('start');
        }
    }
    const stopAnimation = () => {
        if(intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            // console.log('stop');
        }
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
        if (intervalId) {
            stopAnimation();
        }
    }
    const mauseOutHandler = () => {
        if (!intervalId) {
            playAnimation();
        }
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
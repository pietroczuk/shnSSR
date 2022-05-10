import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import styles from './imageInViewLoader.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import Blank from "../../../svg/blank/Blank";
import { isScrolledIntoView } from "../../../../utils/utilsFrondend";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface ImageInViewLoaderProps {
    title: string;
    imgSrc?: string;
    cssClass?: string;
    placeholderStyle?: CSSProperties
    aspectRatioWidth: number;
    aspectRatioHeight: number;
    parrent?: React.MutableRefObject<HTMLDivElement>;
    hideLoadingSpinner?: boolean;
}

const ImageInViewLoader: FC<ImageInViewLoaderProps> = props => {
    const {
        title, imgSrc, cssClass, aspectRatioWidth, aspectRatioHeight,
        parrent, 
        placeholderStyle,
        hideLoadingSpinner, children } = props;

    const container = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(null);
    const trigerSource = imgSrc ? imgSrc : children ? children : null;
    
    useEffect(() => {
        isViewportInStageVisible();
        trigerSource && setResetTrigger(trigerSource);
        !isVisible && window.addEventListener('scroll', handleWindowScroll, { passive: true });
        return (() => {
            window.removeEventListener('scroll', handleWindowScroll);
            setIsVisible(false);
            trigerSource && setResetTrigger(trigerSource);
        })     
    }, [children, imgSrc, isVisible]);

    const handleWindowScroll = () => {
        isViewportInStageVisible();
    }
    const isViewportInStageVisible = () => {
        const isLocalVisible = isScrolledIntoView(container, parrent ? parrent : null, 100, 100);
        setIsVisible(isLocalVisible);
    }

    return <div className={`${styles.imageContainer} ${cssClass ? cssClass : ''}`} ref={container}>
        {isVisible && trigerSource && trigerSource === resetTrigger &&
            <div className={styles.imagePicture}>
                {children ? children : imgSrc ? <img alt={title} width="100%" height="100%" src={imgSrc} /> : null}
            </div>
        }
        <div className={styles.imagePlaceholder} style={placeholderStyle ? placeholderStyle : {}}>
            {!hideLoadingSpinner &&
                <div className={styles.spinner}>
                    <LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={3} customBorderTopColor={'#f3f3f3'} />
                </div>
            }
            <Blank width={aspectRatioWidth} height={aspectRatioHeight} />
        </div>
    </div>
}

export default withStyles(styles)(ImageInViewLoader);
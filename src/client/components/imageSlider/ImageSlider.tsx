import {
    FC,
    // useEffect, 
    useRef,
    // useState 
    UIEvent
} from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './imageSlider.scss';
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../client";
import { Variation } from "../../redux/Models/Product/Variations/Variation/Variation.model";

interface ImageSliderProps {
    variations: {
        [key: string]: Variation;
    };
}

interface imageArray {
    url: string,
    bgColor: string
}

const ImageSlider: FC<ImageSliderProps> = (props) => {
    const { variations } = props;
    const { images_url } = useSelector((state: RootState) => ({
        images_url: state.SystemConfig.images
    }), shallowEqual);

    const imageScrollRef = useRef<HTMLDivElement>(null);
    // const [isScrolling, setIsScrolling] = useState(false);

    const isMobile = false;
    const images: Array<imageArray> = [];

    Object.entries(variations).forEach(([_key, variant]) => {
        const variantImageWall = variant.variationImage.wall;
        const variantImagePoster = variant.variationImage.poster;
        const bgColor = variant.color;
        images.find(img => img.url === variantImageWall) ? null : images.push({ url: variantImageWall, bgColor: bgColor });
        images.find(img => img.url === variantImagePoster) ? null : images.push({ url: variantImagePoster, bgColor: bgColor });
    });

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        if (target.scrollLeft % target.offsetWidth === 0) {
            console.log('Scrolling is done!');
        }
    }
    const gotoNextSlide = () => {
        console.log('next')
        imageScrollRef.current.scrollBy({
            left: 1,
            behavior: 'smooth'
        });
        // imageScrollRef.current.scrollTo({
        //     left: 2,
        //     behavior: 'smooth'
        // });
    }
    const gotoPrevSlide = () => {
        console.log('prev')
        imageScrollRef.current.scrollBy({
            left: -1,
            behavior: 'smooth'
        });
    }

    return <div className={styles.imageSlider}>

        {console.log('redner')}
        <button style={{ position: 'absolute', left: '50px' }} onClick={gotoNextSlide}>next</button>
        <button style={{ position: 'absolute' }} onClick={gotoPrevSlide}>prev</button>
        <div className={styles.sliderContainer} ref={imageScrollRef} onScroll={handleScroll}>
            {images.map((imageData, index) => {
                // console.log(index);
                // const imageType = index % 2 !== 0 ? variant.variationImage.poster : variant.variationImage.wall;
                const addStartStyle = isMobile ? true : index % 2 == 0 ? true : false;
                const addPadding = index % 2 == 0 ? false : true;
                return (
                    <div key={index} className={`${styles.slide} ${addStartStyle ? styles.slideStart : ''} 
                    
                    `}
                        style={{ backgroundColor: imageData.bgColor }}
                    >
                        <div className={`${styles.imageContainer} ${addPadding ? styles.addSpace : ''}`}>
                            <div className={styles.productImage} >
                                <img src={images_url.url + '/' + imageData.url + images_url.medium} />
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    </div >
}

export default withStyles(styles)(ImageSlider);
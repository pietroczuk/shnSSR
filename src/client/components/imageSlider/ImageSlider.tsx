import {
    FC,
    // useEffect, 
    useRef,
    // useState 
    UIEvent,
    useEffect,
    // useState
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
    const { images_url, product, 
        ssr, 
        isMobile,
        //  productId 
        } = useSelector((state: RootState) => ({
        images_url: state.SystemConfig.images,
        product: state.Page.data.productPage,
        // productId: state.Page.info.id,
        ssr: state.PublicConfig.ssr,
        isMobile: state.Display.isMobile
    }), shallowEqual);

    const imageScrollRef = useRef<HTMLDivElement>(null);

    const currentVariationId = product ? product.currentVariationId : null;
    const sliderPosition = currentVariationId && product.variations ? product.variations[currentVariationId].variationImage.sliderPosition : null;

    const sliderIndex = sliderPosition ? sliderPosition : 0;

    const fakeImages = [];
    const imagePerProductDesktop = 2;

    useEffect(() => {
        console.log('imageScrollRef ssr');
        gotoSlide(sliderIndex, ssr);
    }, [product.currentVariationId])

    const images: Array<imageArray> = [];

    // const [images, setImages] = useState<Array<imageArray>>([]);

    // useEffect(() => {
    //     setImages([]);
    // }, [productId]);

    // const initialStateImages: Array<imageArray> = [];

    Object.entries(variations).forEach(([_key, variant]) => {
        const variantImageWall = variant.variationImage.wall;
        const variantImagePoster = variant.variationImage.poster;
        const bgColor = variant.color;
        // images.find(img => img.url === variantImageWall) ? null : images.push({ url: variantImageWall, bgColor: bgColor });
        // images.find(img => img.url === variantImagePoster) ? null : images.push({ url: variantImagePoster, bgColor: bgColor });
        if (isMobile) {
            if (!images.find(img => img.url === variantImagePoster)) {
                images.push({ url: variantImagePoster, bgColor: bgColor });
                // setImages(prevState => [...prevState, { url: variantImagePoster, bgColor: bgColor }]);
            }
            if (!images.find(img => img.url === variantImageWall)) {
                images.push({ url: variantImageWall, bgColor: bgColor });
                // setImages(prevState => [...prevState, { url: variantImageWall, bgColor: bgColor }]);
            }
        } else {
            if (!images.find(img => img.url === variantImageWall)) {
                images.push({ url: variantImageWall, bgColor: bgColor });
                // setImages(prevState => [...prevState, { url: variantImageWall, bgColor: bgColor }]);
            }
            if (!images.find(img => img.url === variantImagePoster)) {
                images.push({ url: variantImagePoster, bgColor: bgColor });
                // setImages(prevState => [...prevState, { url: variantImagePoster, bgColor: bgColor }]);
            }
        }
    });

    if (ssr) {
        // console.log('images', images);
        const imageData = images; //images.length ? images : initialStateImages;
        const ssrSliderIndex = isMobile ? sliderIndex : sliderIndex * imagePerProductDesktop;
        const initialImageWall = imageData.length > ssrSliderIndex ? imageData[ssrSliderIndex] : null;
        const initialImagePoster = imageData.length >= ssrSliderIndex ? imageData[ssrSliderIndex + 1] : null;

        while (fakeImages.length < imageData.length) {
            initialImageWall && fakeImages.push(initialImageWall);
            initialImagePoster && fakeImages.push(initialImagePoster);
        }
    }
    

    const sliderImages = ssr ? fakeImages : images;

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        if (target.scrollLeft % target.offsetWidth === 0) {
            console.log('Scrolling is done!');
        }
    }
    const gotoSlide = (slideIndex: number, forcePossition: boolean = false) => {
        const scrollWith = imageScrollRef.current.scrollWidth;
        const scrollPosition = imageScrollRef.current.scrollLeft;
        const countSlides = isMobile ? images.length : images.length / imagePerProductDesktop;

        const slideWidth = scrollWith / countSlides;

        const scrollToPossition = slideIndex * slideWidth;
        if (scrollPosition !== scrollToPossition) {
            imageScrollRef.current.scrollTo({
                left: scrollToPossition,
                behavior: forcePossition ? 'auto' : 'smooth'
            });
        }
        console.log('gotoslide', forcePossition);
    }

    const gotoNextSlide = () => {
        imageScrollRef.current.scrollBy({
            left: 1,
            behavior: 'smooth'
        });
    }
    const gotoPrevSlide = () => {
        imageScrollRef.current.scrollBy({
            left: -1,
            behavior: 'smooth'
        });
    }

    return <div className={styles.imageSlider}>

        {console.log('[Image slider] redner')}
        <button style={{ position: 'absolute', left: '50px', zIndex: 1 }} onClick={gotoNextSlide}>next</button>
        <button style={{ position: 'absolute', zIndex: 1 }} onClick={gotoPrevSlide}>prev</button>
        <div className={styles.sliderContainer} ref={imageScrollRef} onScroll={handleScroll} id="imageSlider">
            {sliderImages.map((imageData, index) => {
                // console.log(index);
                // const imageType = index % 2 !== 0 ? variant.variationImage.poster : variant.variationImage.wall;
                const addStartStyle = isMobile ? true : index % imagePerProductDesktop == 0 ? true : false;
                const addPadding = index % imagePerProductDesktop == 0 ? false : true;
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
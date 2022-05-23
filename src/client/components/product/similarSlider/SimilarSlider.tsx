import { FC, useEffect, useRef, useState, UIEvent } from "react";
import styles from './similarSlider.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { isScrolledIntoView, pageTypes, similarProductTypes } from "../../../utils/utilsFrondend";
import { getSimilarProducts } from "../../../redux/actionCreators/page/page.ac";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../client";
import ProductItem from "../../productItem/ProductItem";
import { Product } from "../../../redux/Models/Product/Product.model";
import SliderNavButton from "../imageSlider/sliderNavButton/SliderNavButton";

interface SimilarSliderProps {
    type: keyof typeof similarProductTypes
}

const SimilarSlider: FC<SimilarSliderProps> = props => {
    const { type } = props;
    const { productId, limit, api, language, products, isMobile, collectionId } = useSelector((state: RootState) => {
        let limit = 0;
        let products: {
            [key: string]: Product;
        } = {};
        switch (type) {
            case similarProductTypes.category:
                limit = state.PublicConfig.config.productSlidersConfig.categoryLimit;
                products = state.Page.data.productPage.similarCategory.products;
                break;
            case similarProductTypes.collection:
                limit = state.PublicConfig.config.productSlidersConfig.collectionLimit;
                products = state.Page.data.productPage.similarCollection.products;
                break;
        }
        const productId = state.Page.info.id && state.Page.info.type == pageTypes.productPage ? state.Page.info.id : null;
        const api = state.SystemConfig.api;
        const language = state.User.language;
        const isMobile = state.Display.isMobile;
        const collectionId = productId ? state.Page.data.productPage.colection : null;
        return { productId, limit, api, language, products, isMobile, collectionId }
    }, shallowEqual);

    const [isVisible, setIsVisible] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const dispatch = useDispatch();
    const imageScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        isViewportInStageVisible();
        showLeftArrow && setShowLeftArrow(false);
        !showRightArrow && setShowRightArrow(true);
        !isVisible && window.addEventListener('scroll', handleWindowScroll, { passive: true });
        const axiosAbortController = new AbortController();
        productId && isVisible && dispatch(getSimilarProducts(api, type, language, productId, limit, collectionId, axiosAbortController));
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
            setIsVisible(false);
            axiosAbortController.abort();
        }
    }, [productId, isVisible]);

    const handleWindowScroll = () => {
        isViewportInStageVisible();
    }

    const isViewportInStageVisible = () => {
        const isLocalVisible = isScrolledIntoView(imageScrollRef, null, 100, 100);
        setIsVisible(isLocalVisible);
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
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        if (target.scrollLeft <= 0 && showLeftArrow) {
            setShowLeftArrow(false);
        }
        if (!showLeftArrow && target.scrollLeft > 100) {
            setShowLeftArrow(true);
        }
        if (target.scrollWidth - target.scrollLeft <= target.offsetWidth + 100) {
            if (showRightArrow) {
                setShowRightArrow(false);
            }
        } else {
            if (!showRightArrow) {
                setShowRightArrow(true);
            }
        }
        // console.log(target.scrollWidth - target.scrollLeft , target.offsetWidth);
    }

    return <div className={styles.sliderContainer}>
        {!isMobile && showLeftArrow && <SliderNavButton onClickHandler={gotoPrevSlide} leftDirection={true} />}
        {!isMobile && showRightArrow && <SliderNavButton onClickHandler={gotoNextSlide} leftDirection={false} />}

        <div className={styles.slider} ref={imageScrollRef} onScroll={handleScroll}>
            {products ?
                Object.entries(products).map(([_key, val]) => {
                    return <div className={styles.slide} key={val.id}>
                        <ProductItem
                            product={val}
                            customWidth={100}
                            forceVisualMode={false}
                            forceRandomMode={false}
                        />
                    </div>
                })
                :
                [...Array(limit)].map((_el, index) => {
                    return <div className={styles.slide} key={index}>
                        <ProductItem customWidth={100} />
                    </div>
                })
            }
        </div>
    </div>
}
export default withStyles(styles)(SimilarSlider);
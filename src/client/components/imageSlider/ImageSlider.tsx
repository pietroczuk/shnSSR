import { FC } from "react";
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

    const isMobile = false;
    const images: Array<imageArray> = [];
    // const imagesBackGround = [];
    Object.entries(variations).forEach(([_key, variant]) => {
        const variantImageWall = variant.variationImage.wall;
        const variantImagePoster = variant.variationImage.poster;
        const bgColor = variant.color;

        images.find(img => img.url === variantImageWall) ? null : images.push({ url: variantImageWall, bgColor: bgColor });
        images.find(img => img.url === variantImagePoster) ? null : images.push({ url: variantImagePoster, bgColor: bgColor });
    });

    return <div className={styles.sliderContainer}>
        {images.map((imageData, index) => {
            // console.log(index);
            // const imageType = index % 2 !== 0 ? variant.variationImage.poster : variant.variationImage.wall;
            const addStartStyle = isMobile ? true : index % 2 == 0 ? true : false;
            return (
                <div key={index} className={`${styles.slide} ${addStartStyle ? styles.slideStart : ''}`}
                    style={{ backgroundColor: imageData.bgColor }}
                >
                    <div className={styles.imageContainer}>
                        <div className={styles.productImage}>
                            <img src={images_url.url + '/' + imageData.url + images_url.medium} />
                        </div>
                    </div>
                </div>
            )
        }
        )}
    </div>
}

export default withStyles(styles)(ImageSlider);
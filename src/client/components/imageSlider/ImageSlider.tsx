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

const ImageSlider: FC<ImageSliderProps> = (props) => {
    const { variations } = props;
    const { images_url } = useSelector((state: RootState) => ({
        images_url: state.SystemConfig.images
    }), shallowEqual);

    const isMobile = false;

    return <div className={styles.sliderContainer}>
        {variations && Object.entries(variations).map(([key, variant], index) => {
            // console.log(index);
            const imageType = index % 2 !== 0 ? variant.variationImage.poster : variant.variationImage.wall;
            const addStartStyle = isMobile ? true : index % 2 == 0 ? true : false;
            return (
                <div key={key} className={`${styles.slide} ${addStartStyle ? styles.slideStart : ''}`}>
                    <img
                        width="300px"
                        height="400px"
                        alt="aaa"
                        src={images_url.url + '/' + imageType + images_url.medium}
                    />
                </div>
            )
        }
        )}
    </div>
}

export default withStyles(styles)(ImageSlider);
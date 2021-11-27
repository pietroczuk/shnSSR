import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './imageDisplay.scss';

import { useSelector, shallowEqual } from "react-redux";

import LoadingSpinner from "../../helpers/ui/loadingSpinner/LoadingSpinner";
import Blank from "../../svg/blank/Blank";

const ImageDisplay = props => {
    const multiplyMesurment = 100;
    const { titlekey, imagesHolderUrl, forceVisual, onHover, placeholder } = props;
    const { showVisual, imagesConfig, image_width, image_height } = useSelector(state => ({
        showVisual: !forceVisual ? state.Display.showVisual : forceVisual,
        imagesConfig: state.SystemConfig.images,
        image_width: state.SystemConfig.images.aspect_ratio.width * multiplyMesurment,
        image_height: state.SystemConfig.images.aspect_ratio.height * multiplyMesurment,
    }), shallowEqual);

    const img_base = imagesConfig.url + '/';
    const img_size = imagesConfig.large;

    const simple = !placeholder ? img_base + imagesHolderUrl.variation_image.poster + img_size : null;
    const visual = !placeholder ? img_base + imagesHolderUrl.variation_image.wall + img_size : null;
    const image_url = showVisual ? visual : simple;

    return (
        <div className={styles.imageContainer}>
            <div className={styles.imageContainerRelative}>
                <div className={`${styles.imagePicture} ${showVisual ? styles.noPadding : ''} ${onHover ? styles.slideTop : ''}`}>
                    {placeholder && <LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={3} customBorderTopColor={'#f3f3f3'} />}
                    {!placeholder && <img className={styles.single} alt={titlekey} src={image_url} />}
                </div>
                <div className={styles.imagePlaceholder} >
                    <Blank width={image_width} height={image_height} />
                </div>
            </div>
        </div>
    )



}

export default withStyles(styles)(ImageDisplay)


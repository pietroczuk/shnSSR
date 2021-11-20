import React from "react";
import { useSelector } from "react-redux";

import { isObjectEmpty } from "../../../../utils/utilsFrondend";

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './showSelectedAttributes.scss';

import ColorCircle from "../features/atributes/colors/colorCircle/ColorCircle";

const ShowSelectedAttributes = props => {
    const { selectedVariantId, avaibleVariations } = props;
    const { features } = useSelector(state => ({
        features: state.PublicConfig.features
    }));
    const productFeatData = avaibleVariations && avaibleVariations[selectedVariantId] && avaibleVariations[selectedVariantId].variation_code ? avaibleVariations[selectedVariantId].variation_code : null;
    if (isObjectEmpty(productFeatData) || isObjectEmpty(features)) {
        return null;
    }
    return <div className={styles.featDataCont}>{
        Object.keys(productFeatData).map(attribId => {
            const variantFeature = productFeatData[attribId];
            const foundFeature = features[variantFeature.feature] && features[variantFeature.feature] !== undefined ? features[variantFeature.feature] : null;
            const attribInWishlist = foundFeature && foundFeature.wishlist !== null && foundFeature.wishlist !== undefined ? foundFeature.wishlist : null;
            if (!attribInWishlist) {
                return;
            }
            const title = foundFeature.feature_title ? foundFeature.feature_title : null;
            const attribData = foundFeature.atributes ? foundFeature.atributes[variantFeature.atrib_id] : null;
            const glow_color = attribData && attribData.glow_color ? attribData.glow_color : null;
            const attrib_title = attribData && attribData.attrib_title ? attribData.attrib_title : null;
            return <div key={variantFeature.feature} className={styles.attribContener}>
                <span className={styles.title}>{title}:</span>
                <span className={styles.attribTitle}>{attrib_title}</span>
                <span className={styles.attribColor}>
                    <ColorCircle glow_color={glow_color} mini={true}/>
                </span>
            </div>

        })
    }
    </div>
}

export default withStyles(styles)(ShowSelectedAttributes);
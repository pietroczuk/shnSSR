import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { isObjectEmpty } from "../../../../../utils/utilsFrondend";

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './showSelectedAttributes.scss';

import ColorCircle from "../../features/atributes/colors/colorCircle/ColorCircle";
import { RootState } from "../../../../../client";
import { Variations } from "../../../../../redux/Models/Product/Variations/Variations.model";

interface ShowSelectedAttributesProps {
    selectedVariantId: string;
    avaibleVariations: Variations;
    customFontSize?: number;
}

const ShowSelectedAttributes: React.FC<ShowSelectedAttributesProps> = props => {
    const { selectedVariantId, avaibleVariations, customFontSize } = props;
    const features = useSelector((state: RootState) => state.PublicConfig.features, shallowEqual);
    const productFeatData = avaibleVariations && avaibleVariations[selectedVariantId] && avaibleVariations[selectedVariantId].variation_code ? avaibleVariations[selectedVariantId].variation_code : null;
    if ((productFeatData && isObjectEmpty(productFeatData)) || isObjectEmpty(features)) {
        return null;
    }
    return <div className={styles.featDataCont} style={customFontSize ? {fontSize: customFontSize+'em'} : {}}>{
        productFeatData && Object.keys(productFeatData).map(attribId => {
            const variantFeature = productFeatData[attribId];
            const foundFeature = features[variantFeature.feature] && features[variantFeature.feature] ? features[variantFeature.feature] : null;
            const attribInWishlist = foundFeature && foundFeature.wishlist !== null && foundFeature.wishlist ? foundFeature.wishlist : null;
            if (!attribInWishlist) {
                return null;
            }
            const title = foundFeature && foundFeature.feature_title ? foundFeature.feature_title : null;
            const attribData = foundFeature && foundFeature.atributes ? foundFeature.atributes[variantFeature.atrib_id] : null;
            const glow_color = attribData && attribData.glow_color ? attribData.glow_color : null;
            const attrib_title = attribData && attribData.attrib_title ? attribData.attrib_title : null;
            return <div key={variantFeature.feature} className={styles.attribContener}>
                <span className={styles.title}>{title}:</span>
                <span className={styles.attribTitle}>{attrib_title}</span>
                <span className={styles.attribColor}>
                    <ColorCircle glow_color={glow_color} mini={true} />
                </span>
            </div>

        })
    }
    </div>
}

export default withStyles(styles)(ShowSelectedAttributes);
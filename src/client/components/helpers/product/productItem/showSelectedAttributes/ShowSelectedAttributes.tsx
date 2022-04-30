import { FC } from "react";
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
    isWishlist: boolean;
    customFontSize?: number;
}

const ShowSelectedAttributes: FC<ShowSelectedAttributesProps> = props => {
    const { selectedVariantId, avaibleVariations, customFontSize, isWishlist } = props;
    const features = useSelector((state: RootState) => state.PublicConfig.features, shallowEqual);
    const productFeatData = avaibleVariations && avaibleVariations[selectedVariantId] && avaibleVariations[selectedVariantId].variationCode ? avaibleVariations[selectedVariantId].variationCode : null;
    if ((productFeatData && isObjectEmpty(productFeatData)) || isObjectEmpty(features)) {
        return null;
    }
    return <div className={styles.featDataCont} style={customFontSize ? { fontSize: customFontSize + 'em' } : {}}>{
        productFeatData && Object.keys(productFeatData).map(attribId => {
            const variantFeature = productFeatData[attribId];
            const foundFeature = features[variantFeature.feature] && features[variantFeature.feature] ? features[variantFeature.feature] : null;
            const attribInWishlist = !isWishlist ? true : foundFeature && foundFeature.wishlist ? foundFeature.wishlist : null;
            if (!attribInWishlist) {
                return null;
            }
            const title = foundFeature && foundFeature.featureTitle ? foundFeature.featureTitle : null;
            const attribData = foundFeature && foundFeature.atributes ? foundFeature.atributes[variantFeature.atribId] : null;
            const glowColor = attribData && attribData.glowColor ? attribData.glowColor : null;
            const attribTitle = attribData && attribData.attribTitle ? attribData.attribTitle : null;
            return <div key={variantFeature.feature} className={styles.attribContener}>
                <span className={styles.title}>{title}:</span>
                <span className={styles.attribTitle}>{attribTitle}</span>
                {foundFeature.featureDisplay === "color" && <span className={styles.attribColor}>
                    <ColorCircle glowColor={glowColor} mini={true} />
                </span>}
            </div>

        })
    }
    </div>
}

export default withStyles(styles)(ShowSelectedAttributes);
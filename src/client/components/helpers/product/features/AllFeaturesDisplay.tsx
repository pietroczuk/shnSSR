import React from 'react';
import styles from './allFeaturesDisplay.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../client';

import SingleFeature from './atributes/singleFeature/SingleFeature';
import { DefaultVariantCode } from '../../../../redux/Models/PublicConfig/DefaultVariantCode/DefaultVariantCode.model';

interface AllFeaturesDisplayProps {
    currentVariationCode?: DefaultVariantCode;
    allProductVariation?: any;
    onlyWishlistFeatures?: boolean;
    displayInline?: boolean;
    isGlobalChange?: boolean;
    disableOpacity?: boolean;
    onClickFunction?: (featureId: string, obj: object) => void;
}

const AllFeaturesDisplay: React.FC<AllFeaturesDisplayProps> = props => {
    const {
        currentVariationCode,
        allProductVariation,
        onlyWishlistFeatures,
        displayInline,
        isGlobalChange,
        disableOpacity,
        onClickFunction
    } = props;
    // from redux
    const { features, showRandom, defaultVariantCode } = useSelector((state: RootState) => ({
        features: state.PublicConfig.features,
        showRandom: state.Display.showRandom,
        defaultVariantCode: state.PublicConfig.defaultVariantCode
    }), shallowEqual);

    // If we dont pass local variantcodes, we still operate on global like local
    const localCurrentVariationCode = currentVariationCode ? currentVariationCode : defaultVariantCode
    return (
        <div className={`${styles.featureRootContainer} ${displayInline ? styles.inline : ''} ${showRandom && displayInline && !disableOpacity ? styles.halfvisible : ''}`}>
            {Object.entries(features).map(([featureKey, feature]) => {
                if (onlyWishlistFeatures) {
                    if (!feature.wishlist) {
                        return null;
                    }
                }
                return <div key={featureKey} className={styles.featureContainer}>
                    <SingleFeature
                        title={feature.featureTitle}
                        atributes={feature.atributes}
                        displayType={feature.featureDisplay}
                        featureKey={featureKey}
                        currentVariationCode={localCurrentVariationCode}
                        allProductVariation={allProductVariation}
                        isGlobalChange={isGlobalChange}
                        onClickFunction={onClickFunction}
                    />
                </div>
            }
            )}
        </div>
    )
}
export default withStyles(styles)(AllFeaturesDisplay);
import { FC } from 'react';
import styles from './allFeaturesDisplay.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../client';

import SingleFeature from './atributes/singleFeature/SingleFeature';
import { DefaultVariantCode } from '../../../../redux/Models/PublicConfig/DefaultVariantCode/DefaultVariantCode.model';
import { VariationHashmap } from '../../../../redux/Models/Product/VariationHashmap/VariationHashmap.model';

interface AllFeaturesDisplayProps {
    currentVariationCode?: DefaultVariantCode;
    // allProductVariation?: any;
    variationHashmap?: VariationHashmap;
    onlyWishlistFeatures?: boolean;
    displayInline?: boolean;
    displayOnProductPage?: boolean;
    isGlobalChange?: boolean;
    disableOpacity?: boolean;
    onClickFunction?: (featureId: string, obj: object) => void;
}

const AllFeaturesDisplay: FC<AllFeaturesDisplayProps> = props => {
    const {
        currentVariationCode,
        // allProductVariation,
        variationHashmap,
        onlyWishlistFeatures,
        displayInline,
        displayOnProductPage,
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
    // console.log('localCurrentVariationCode', localCurrentVariationCode, currentVariationCode);
    return (
        <div className={`
            ${styles.featureRootContainer} 
            ${displayInline ? styles.inline : ''}
            ${displayOnProductPage ? styles.productInline : ''}
            ${showRandom && displayInline && !disableOpacity ? styles.halfvisible : ''}
            `}>
            {Object.entries(features).map(([featureKey, feature]) => {
                if (onlyWishlistFeatures) {
                    if (!feature.wishlist) {
                        return null;
                    }
                }
                // const isGlobalChangePermission = isGlobalChange ? feature.wishlist ? true : false : false;

                return <div key={featureKey}
                    className={`${styles.featureContainer} 
                ${feature.featureDisplay !== 'color' ? styles.fullWidth : ''}
                `}>
                    <SingleFeature
                        title={feature.featureTitle}
                        atributes={feature.atributes}
                        displayType={feature.featureDisplay}
                        featureKey={featureKey}
                        currentVariationCode={localCurrentVariationCode}
                        variationHashmap={variationHashmap}
                        // allProductVariation={allProductVariation}
                        // isGlobalChange={isGlobalChangePermission}
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
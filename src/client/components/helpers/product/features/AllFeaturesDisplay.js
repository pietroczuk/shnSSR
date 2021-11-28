import React from 'react';
import styles from './allFeaturesDisplay.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import SingleFeature from './atributes/singleFeature/SingleFeature';

import { useSelector, shallowEqual } from 'react-redux';

const AllFeaturesDisplay = props => {
    const { 
        currentVariationCode, 
        allProductVariation, 
        wishlistAvaible, 
        displayInline, 
        globalChange, 
        disableOpacity,
        onClickFunction
    } = props;
    // from redux
    const { features, showRandom } = useSelector(state => ({
        features: state.PublicConfig.features,
        showRandom: state.Display.showRandom
    }), shallowEqual);
    return (
        <div className={`${styles.featureRootContainer} ${displayInline ? styles.inline : ''} ${showRandom && displayInline && !disableOpacity ? styles.halfvisible : ''}`}>
            {Object.entries(features).map(([featureKey, feature]) => {
                if (wishlistAvaible) {
                    if (!feature.wishlist) {
                        return;
                    }
                }
                return <div key={featureKey} className={styles.featureContainer}>
                    <SingleFeature
                        title={feature.feature_title}
                        atributes={feature.atributes}
                        displayType={feature.feature_display}
                        featureKey={featureKey}
                        currentVariationCode={currentVariationCode}
                        allProductVariation={allProductVariation}
                        globalChange={globalChange}
                        onClickFunction={onClickFunction}
                    />
                </div>
            }
            )}
        </div>
    )
}
export default withStyles(styles)(AllFeaturesDisplay);
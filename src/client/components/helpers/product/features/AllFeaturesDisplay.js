import React from 'react';
import styles from './allFeaturesDisplay.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import Colors from './atributes/colors/Colors';
// import Text from './atributes/text/Text';
// import SelectedBg from './atributes/text/selectedBg/SelectedBg';
import SingleFeature from './atributes/singleFeature/SingleFeature';

import { useSelector } from 'react-redux';
// import { set_variant_code } from '../../redux/actions/all_actions';

// import { getSearchParams } from '../../utils/utilsFrondend';


const AllFeaturesDisplay = props => {
    const { currentVariationCode, allProductVariation, wishlistAvaible, displayInline } = props;
    // from redux
    const features = useSelector(state => state.PublicConfig.features);

    // console.log(currentVariationCode, allProductVariation);

    return (
        <div className={`${styles.featureRootContainer} ${displayInline ? styles.inline : ''}`}>
            {Object.entries(features).map(([featureKey, feature]) => {
                if(wishlistAvaible) {
                    if(!feature.wishlist) {
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
                    />
                </div>
            }
            )}
        </div>
    )
}
export default withStyles(styles)(AllFeaturesDisplay);
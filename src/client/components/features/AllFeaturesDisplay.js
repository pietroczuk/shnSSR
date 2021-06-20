import React, { useEffect, useState } from 'react';
import styles from './allFeaturesDisplay.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import Colors from './atributes/colors/Colors';
// import Text from './atributes/text/Text';
// import SelectedBg from './atributes/text/selectedBg/SelectedBg';
import SingleFeature from './atributes/singleFeature/SingleFeature';

import { connect } from 'react-redux';
// import { set_variant_code } from '../../redux/actions/all_actions';

const AllFeaturesDisplay = props => {
    // from redux
    const { features } = props;
    // from props
    const { currentVariationCode, allProductVariation } = props;

    // const avaible_features_array = [];
    // Object.entries(features).forEach(([featureKey, feature]) => 
    //     {
    //         current_variation_code.some(c_v_code => feature.
    //         );
    //     }
    // );
    // console.log('all', currentVariationCode);
    return (
        <div className={styles.featureRootContainer}>
            {Object.entries(features).map(([featureKey, feature]) =>
                <div key={featureKey} className={`
                ${styles.featureContainer} 
                
                `}>
                    <SingleFeature
                        title={feature.feature_title}
                        atributes={feature.atributes}
                        displayType={feature.feature_display}
                        featureKey={featureKey}
                        currentVariationCode = {currentVariationCode}
                        allProductVariation={allProductVariation}
                    />
                </div>
            )}
        </div>
    )
}
const mapStateToProps = state => ({
    features: state.global.features

});

export default
    connect(mapStateToProps, {
        // set_variant_code
    })
        (withStyles(styles)(AllFeaturesDisplay))
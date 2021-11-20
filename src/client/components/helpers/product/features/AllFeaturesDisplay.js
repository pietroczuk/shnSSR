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
    // from redux
    const features = useSelector(state => state.PublicConfig.features);
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
    // useEffect(() => {
    //     getSearchParams();
    // }, []);

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
                        currentVariationCode={currentVariationCode}
                        allProductVariation={allProductVariation}
                    />
                </div>
            )}
        </div>
    )
}
export default withStyles(styles)(AllFeaturesDisplay);
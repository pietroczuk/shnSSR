import React, { useState } from 'react';
import styles from './singleFeature.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Colors from '../colors/Colors';
import Text from '../text/Text';
import SelectedBg from '../text/selectedBg/SelectedBg';


const SingleFeature = ({ title, atributes, displayType, currentVariationCode, featureKey, allProductVariation }) => {
    const width = atributes ? Object.keys(atributes).length : 'auto';

    const [activeCodeValue, setActiveCodeValue] = useState('');

    let bgPossition = 0;
    // let activeCodeValue = '';

    const setActiveCodeValueHandler = codeValue => {
        activeCodeValue != codeValue && setActiveCodeValue(codeValue); // : null;
    }
    const displaySingleFeature = () => {
        // setActiveCodeValue('aaaaaa');
        return Object.entries(atributes).map(([att_key, att_val], index) => {
            const active = currentVariationCode[att_key] ? true : false;
            let matchCode = '';
            const new_variant = { ...currentVariationCode };
            // active ? setActiveCodeValue(att_val.attrib_title): null;
            // return;
            if (!active) {
                Object.entries(currentVariationCode).forEach(([new_cur_key, new_cur_val]) => {
                    if (new_cur_val.feature == featureKey) {
                        // remove att_key from object
                        delete new_variant[new_cur_key];
                        new_variant[att_val.id] = { ...new_cur_val, 'code': att_val.code, 'atrib_id': att_val.id };
                    }
                })
            } else {
                bgPossition = index;
                setActiveCodeValueHandler(att_val.attrib_title);
                // console.log(att_val.attrib_title);
            }
            // console.log('single', allProductVariation);
            Object.entries(allProductVariation).forEach(([variant_key, variant_val]) => {
                /**********
                     new_variant - input data
                        - key = attrib_key
                                - varian code
                    variant_key - my link
                    variant_val: Object 
                        - variation_code - object with keys
                            - key = attrib_key
                                - varian code
                  */
                let match = true;

                Object.entries(new_variant).forEach(([new_v_key, new_v_val]) => {
                    if (!variant_val.variation_code[new_v_key]) {
                        match = false;
                    }
                })
                if (match) {
                    matchCode = variant_key;
                }
                // console.log(matchCode);
            });

            switch (displayType) {
                case 'color':
                    return <Colors
                        key={att_key}
                        attrib={att_val}
                        active={active}
                        width={width}
                        link={matchCode}
                    />
                case 'text':
                    return <Text
                        key={att_key}
                        attrib={att_val}
                        active={active}
                        width={width}
                        link={matchCode}
                    />
            }
        })
    }

    return (
        <React.Fragment>
            {/* {console.log('render', activeCodeValue)} */}
            <div>
                <p>{title}</p>
                <p><strong>{activeCodeValue}</strong></p>
            </div>
            <div className={`${styles.featureAttribs}
                ${displayType == 'color' ? styles.featureColor : ''}
                ${displayType == 'text' ? styles.featureText : ''}
                ${displayType == 'list' ? styles.featureList : ''}
            `}>
                {displaySingleFeature()}
                {displayType == 'text' && <SelectedBg width={width} position={bgPossition}></SelectedBg>}
            </div>
        </React.Fragment>
    )
}
// const mapStateToProps = state => ({
//     features: state.global.features
// });
export default withStyles(styles)(SingleFeature)
// export default
//     connect(null, {
//         set_product_curr_var_id
//     })
//         (withStyles(styles)(SingleFeature))
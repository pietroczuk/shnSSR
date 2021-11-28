import React, { useState } from 'react';
import styles from './singleFeature.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Colors from '../colors/Colors';
import Text from '../text/Text';
import SelectedBg from '../text/selectedBg/SelectedBg';

import { getObjectLength } from '../../../../../../utils/utilsFrondend';


const SingleFeature = props => {
    const { title, atributes, displayType, currentVariationCode, featureKey, allProductVariation, globalChange } = props;
    const width = atributes ? getObjectLength(atributes) : 'auto';

    const [activeCodeValue, setActiveCodeValue] = useState('');

    let bgPossition = 0;

    const setActiveCodeValueHandler = codeValue => {
        activeCodeValue != codeValue && setActiveCodeValue(codeValue); // : null;
    }
    const displaySingleFeature = () => {
        return Object.entries(atributes).map(([att_key, att_val], index) => {
            const active = currentVariationCode[featureKey] && currentVariationCode[featureKey].atrib_id == att_key ? true : false;
            let matchCode = '';
            const new_variant = { ...currentVariationCode };
            // active ? setActiveCodeValue(att_val.attrib_title): null;
            // return;
            // console.log('currentVariationCode', currentVariationCode, new_variant);
            if (!active) {
                new_variant[featureKey] = { ...new_variant[featureKey], 'code': att_val.code, 'atrib_id': att_val.id }
            } else {
                bgPossition = index;
                setActiveCodeValueHandler(att_val.attrib_title);
                // console.log(att_val.attrib_title);
            }
            // console.log('single', allProductVariation);
            allProductVariation && Object.entries(allProductVariation).forEach(([variant_key, variant_val]) => {
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
                // console.log('new_variant', new_variant);
                Object.entries(new_variant).forEach(([new_v_key, new_v_val]) => {
                    if (variant_val.variation_code[new_v_key]) {
                        // console.log('c',variant_val.variation_code[new_v_key]);
                        if (variant_val.variation_code[new_v_key].atrib_id !== new_v_val.atrib_id) {
                            match = false;
                        }
                    } else {
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
                        globalChange={globalChange}
                        featureKey={featureKey}
                    />
                case 'text':
                    return <Text
                        key={att_key}
                        attrib={att_val}
                        active={active}
                        width={width}
                        link={matchCode}
                        globalChange={globalChange}
                        featureKey={featureKey}
                    />
            }
        })
    }

    return (
        <React.Fragment>
            {/* {console.log('render', activeCodeValue)} */}
            <div className={styles.featureTitle}>
                <span className={styles.label}>{title}</span>
                <span className={styles.subtitle}>{activeCodeValue}</span>
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
export default withStyles(styles)(SingleFeature)
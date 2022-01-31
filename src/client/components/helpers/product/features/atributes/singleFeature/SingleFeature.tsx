import React, { useState } from 'react';
import styles from './singleFeature.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Colors from '../colors/Colors';
import Text from '../text/Text';
import SelectedBg from '../text/selectedBg/SelectedBg';

import { getObjectLength } from '../../../../../../utils/utilsFrondend';
import { Atributes, DefaultVariantCode } from '../../../../../../redux/types/publicConfig.types';

interface Props {
    title: string,
    atributes: Atributes,
    displayType: string,
    currentVariationCode: DefaultVariantCode,
    featureKey: string,
    allProductVariation: any,
    globalChange: boolean,
    onClickFunction : (featureId: string, obj: object) => void
}

const SingleFeature: React.FC<Props> = props => {
    const {
        title,
        atributes,
        displayType,
        currentVariationCode,
        featureKey,
        allProductVariation,
        globalChange,
        onClickFunction
    } = props;
    const width = atributes ? getObjectLength(atributes) : 'auto';

    const [activeCodeValue, setActiveCodeValue] = useState('');

    let bgPossition = 0;

    const setActiveCodeValueHandler = (codeValue: string) => {
        activeCodeValue != codeValue && setActiveCodeValue(codeValue); // : null;
    }
    const displaySingleFeature = () => {
        return currentVariationCode && Object.entries(atributes).map(([att_key, att_val], index) => {
            const active = currentVariationCode[featureKey] && currentVariationCode[featureKey].atrib_id == att_key ? true : false;
            // const att_val = atributes[att_key];

            let matchCode = '';
            const new_variant = { ...currentVariationCode };

            if (!active) {
                new_variant[featureKey] = { ...new_variant[featureKey], 'code': att_val.code, 'atrib_id': att_val.id }
            } else {
                bgPossition = index;
                setActiveCodeValueHandler(att_val.attrib_title);
            }

            if (allProductVariation) {
                for (const variant in allProductVariation) {
                    let match = true;
                    for (const searchVariant in new_variant) {
                        const variant_code = allProductVariation[variant].variation_code;
                        if (variant_code[searchVariant].atrib_id !== new_variant[searchVariant].atrib_id) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        matchCode = variant;
                        break;
                    }
                }
            }

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
                        onClickFunction={onClickFunction}
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
                        onClickFunction={onClickFunction}
                    />
                default: return null;
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
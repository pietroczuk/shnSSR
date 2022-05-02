import { FC, Fragment, useState } from 'react';
import styles from './singleFeature.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Colors from '../colors/Colors';
import Text from '../text/Text';
import SelectedBg from '../text/selectedBg/SelectedBg';

import { getObjectLength, intersectArray } from '../../../../../../utils/utilsFrondend';
import { Atributes } from '../../../../../../redux/Models/PublicConfig/Features/SingleFeature/Atributes/Atributes.model';
import { DefaultVariantCode } from '../../../../../../redux/Models/PublicConfig/DefaultVariantCode/DefaultVariantCode.model';
import { VariationHashmap } from '../../../../../../redux/Models/Product/VariationHashmap/VariationHashmap.model';

interface SingleFeatureProps {
    title: string,
    atributes: Atributes,
    displayType: string,
    currentVariationCode: DefaultVariantCode,
    featureKey: string,
    // allProductVariation: any,
    variationHashmap: VariationHashmap,
    isGlobalChange: boolean,
    onClickFunction: Function
}

const SingleFeature: FC<SingleFeatureProps> = props => {
    const {
        title,
        atributes,
        displayType,
        currentVariationCode,
        featureKey,
        // allProductVariation,
        variationHashmap,
        isGlobalChange,
        onClickFunction
    } = props;
    const width = atributes ? getObjectLength(atributes) : undefined

    const [activeCodeValue, setActiveCodeValue] = useState('');

    let bgPossition = 0;

    const setActiveCodeValueHandler = (codeValue: string) => {
        activeCodeValue != codeValue && setActiveCodeValue(codeValue); // : null;
    }
    const displaySingleFeature = () => {
        return currentVariationCode && Object.entries(atributes).map(([att_key, att_val], index) => {
            const active = currentVariationCode[featureKey] && currentVariationCode[featureKey].atribId == att_key ? true : false;
            // const att_val = atributes[att_key];
          
            const newVariant = { ...currentVariationCode };

            if (!active) {
                newVariant[featureKey] = { ...newVariant[featureKey], code: att_val.code, atribId: att_val.id }
            } else {
                bgPossition = index;
                setActiveCodeValueHandler(att_val.attribTitle);
            }
            let link = '';
            if(variationHashmap) {
                const varationFilter = [];

                Object.entries(newVariant).forEach(([key, { atribId }]) => {
                    varationFilter.push(
                        variationHashmap[key][atribId]
                    )
                })
                link = intersectArray(varationFilter);
                link = link ? link[0] : '';
                // console.log(link);
                // console.log('currentVariationCode', currentVariationCode, 'variationHashmap', variationHashmap);
            }
            // if (allProductVariation) {
            //     for (const variant in allProductVariation) {
            //         let match = true;
            //         for (const searchVariant in newVariant) {
            //             const variant_code = allProductVariation[variant].variationCode;
            //             if (variant_code[searchVariant].atribId !== newVariant[searchVariant].atribId) {
            //                 match = false;
            //                 break;
            //             }
            //         }
            //         if (match) {
            //             matchCode = variant;
            //             break;
            //         }
            //     }
            // }

            switch (displayType) {
                case 'color':
                    return <Colors
                        key={att_key}
                        attrib={att_val}
                        active={active}
                        link={link}
                        isGlobalChange={isGlobalChange}
                        featureKey={featureKey}
                        onClickFunction={onClickFunction}
                    />
                case 'text':
                    return <Text
                        key={att_key}
                        attrib={att_val}
                        active={active}
                        width={width}
                        link={link}
                        isGlobalChange={isGlobalChange}
                        featureKey={featureKey}
                        onClickFunction={onClickFunction}
                    />
                default: return null;
            }
        })
    }

    return (
        <Fragment>
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
        </Fragment>
    )
}
export default withStyles(styles)(SingleFeature)
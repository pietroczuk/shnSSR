import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showAddToCartVariants.scss';

import BlackButton from "../../ui/blackButton/BlackButton";
import ShowSizesText from "../../display/showSizesText/ShowSizesText";
import PopupTitle from '../../display/popupTitle/PopupTitle';
import ShowPrice from "../../display/showPrice/ShowPrice";

import { getObjectLength, isObjectEmpty } from "../../../../utils/utilsFrondend";

const ShowAddToCartVariants = props => {
    const { active, avaibleVariations, productId } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);

    const onClickHandler = () => {
        if (getObjectLength(avaibleVariations) > 1) {
            setShowSubmenu(prevstate => !prevstate);
        } else {
            addToCartClickHandler();
        }
    }
    const { add_to_cart, choise, features } = useSelector(state => ({
        add_to_cart: state.PublicConfig.translation && state.PublicConfig.translation.add_to_cart ? state.PublicConfig.translation.add_to_cart : null,
        choise: state.PublicConfig.translation && state.PublicConfig.translation.choise ? state.PublicConfig.translation.choise : null,
        features: state.PublicConfig.features,
    }), shallowEqual);

    useEffect(() => {
        active !== showSubmenu && setShowSubmenu(false);
    }, [active]);

    const addToCartClickHandler = () => {
        console.log('add to cart product id:', productId);
    }


    const showRestVariants = avaibleVariations => {
        if (!getObjectLength(avaibleVariations) || isObjectEmpty(features)) {
            return;
        }
        const featureIdForSelect = Object.keys(features).find(featId => !features[featId].wishlist);
        const featureTitle = featureIdForSelect ? features[featureIdForSelect].feature_title : '';

        return <div className={styles.selectOptionsCointainerRoot}>
            <div className={styles.selectOptionsCointainerChild}>
                <PopupTitle text={choise + ' ' + featureTitle} underline={true} />
                <div className={styles.selectOptionsCointainer}>
                    {/* {console.log(avaibleVariations)} */}
                    {Object.keys(avaibleVariations).map(variantId => {
                        const variant = avaibleVariations[variantId];
                        const variantCode = variant.variation_code;
                        const attribId = variantCode[featureIdForSelect].atrib_id; 
                        // Object.keys(variantCode).find(featureId => variantCode[attribId].feature === featureIdForSelect);
                        
                        // console.log(variantCode[featureIdForSelect], featureIdForSelect);

                        // const featureId = featureIdForSelect;//attribId ? variantCode[attribId].feature : null;
                        // console.log(features[featureId], attribId, featureIdForSelect);
                        const attribTitle = featureIdForSelect ? features[featureIdForSelect].atributes[attribId].attrib_title : null;
                        const attribTooltip = featureIdForSelect ? features[featureIdForSelect].atributes[attribId].attrib_tooltip : null;

                        return (
                            <div className={styles.selectOption} onClick={addToCartClickHandler} key={variantId}>
                                <ShowSizesText text={attribTitle} minitext={attribTooltip} />
                                <ShowPrice allPrices={variant.variation_price} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }

    return <div className={`${styles.container} ${active ? styles.active : ''}`}>
        {showSubmenu && showRestVariants(avaibleVariations)}
        <BlackButton
            label={add_to_cart}
            clickHandler={onClickHandler}
        />
    </div>
}

export default withStyles(styles)(ShowAddToCartVariants);
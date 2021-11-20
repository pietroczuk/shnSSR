import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showAddToCartVariants.scss';

import BlackButton from "../../ui/blackButton/BlackButton";
import ShowSizesText from "../../display/showSizesText/ShowSizesText";
import PopupTitle from '../../display/popupTitle/PopupTitle';
import ShowPrice from "../../display/showPrice/ShowPrice";

import { getObjectLength } from "../../../../utils/utilsFrondend";

const ShowAddToCartVariants = props => {
    const { active, avaibleVariations } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);

    const onClickHandler = () => {
        setShowSubmenu(prevstate => !prevstate);
    }
    const { add_to_cart, choise, features } = useSelector(state => ({
        add_to_cart: state.PublicConfig.translation && state.PublicConfig.translation.add_to_cart ? state.PublicConfig.translation.add_to_cart : null,
        choise: state.PublicConfig.translation && state.PublicConfig.translation.choise ? state.PublicConfig.translation.choise : null,
        features: state.PublicConfig.features,
    }));

    useEffect(() => {
        active !== showSubmenu && setShowSubmenu(false);
    }, [active]);

    const addToCartClickHandler = () => {
        // console.log('add to cart');
    }

    const showRestVariants = avaibleVariations => {
        if (!getObjectLength(avaibleVariations)) {
            return;
        }
        return <div className={styles.selectOptionsCointainerRoot}>
            <div className={styles.selectOptionsCointainerChild}>
                <PopupTitle text={choise} underline={true} />
                <div className={styles.selectOptionsCointainer}>
                    {Object.keys(avaibleVariations).map(variantId => {
                        const variant = avaibleVariations[variantId];
                        const variantCode = variant.variation_code;
                        const attribId = Object.keys(variantCode).find(v_code =>
                            features[variantCode[v_code].feature].wishlist === false
                        );
                        const featureId = attribId ? variantCode[attribId].feature : null;
                        // console.log(attribId, variantCode[attribId], variantCode);
                        const attribTitle = featureId ? features[featureId].atributes[attribId].attrib_title : null;
                        const attribTooltip = featureId ? features[featureId].atributes[attribId].attrib_tooltip : null;

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
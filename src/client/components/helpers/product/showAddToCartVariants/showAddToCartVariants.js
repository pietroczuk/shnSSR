import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showAddToCartVariants.scss';

import BlackButton from "../../ui/blackButton/BlackButton";
import ShowSizesText from "../../display/showSizesText/ShowSizesText";
import PopupTitle from '../../display/popupTitle/PopupTitle';

import { getObjectLength, getPriceByCurrency } from "../../../../utils/utilsFrondend";

const ShowAddToCartVariants = props => {
    const { active, avaibleVariations } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);

    const onClickHandler = () => {
        setShowSubmenu(prevstate => !prevstate);
    }
    const { add_to_cart, choise, features, userCurrency, currency } = useSelector(state => ({
        add_to_cart: state.PublicConfig.translation && state.PublicConfig.translation.add_to_cart ? state.PublicConfig.translation.add_to_cart : null,
        choise: state.PublicConfig.translation && state.PublicConfig.translation.choise ? state.PublicConfig.translation.choise : null,
        features: state.PublicConfig.features,
        userCurrency: state.User.currency,
        currency: state.SystemConfig.currency,
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
        // console.log(avaibleVariations);
        /**
         * TODO: check if variants number > 1 !!!!!
         */
        return <div className={styles.selectOptionsCointainerRoot}>
            <div className={styles.selectOptionsCointainerChild}>
                <PopupTitle text={choise} underline={true} />
                {Object.keys(avaibleVariations).map(variantId => {
                    // console.log(variantId, avaibleVariations);
                    const productPrice = getPriceByCurrency(avaibleVariations[variantId].variation_price, userCurrency, currency);
                    return (
                        <div className={styles.selectOptionsCointainer} key={variantId}>
                            <div className={styles.selectOption} onClick={addToCartClickHandler}>
                                <ShowSizesText text={'30x40'} minitext={'3cm 4 cm'} />
                                <span className={styles.price}>
                                    {productPrice}
                                </span>
                            </div>
                        </div>
                    )
                })}
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
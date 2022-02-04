import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showAddToCartVariants.scss';

import BlackButton from "../../../ui/blackButton/BlackButton";
import ShowSizesText from "../../../display/showSizesText/ShowSizesText";
import PopupTitle from '../../../display/popupTitle/PopupTitle';
import ShowPrice from "../../../display/showPrice/ShowPrice";

import { getObjectLength, isObjectEmpty } from "../../../../../utils/utilsFrondend";
import HoverPopupContainer from "../hoverPopupContainer/HoverPopupContainer";
import { RootState } from "../../../../../client";
import { Variations } from "../../../../../redux/Models/Product/Variations/Variations.model";
import { addToStoreCart } from "../../../../../redux/actionCreators/cart/cart.ac";

interface ShowAddToCartVariantsProps {
    active: boolean;
    avaibleVariations: Variations;
    productId: string
}

const ShowAddToCartVariants: React.FC<ShowAddToCartVariantsProps> = props => {
    const { active, avaibleVariations, productId } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);

    const onClickHandler = () => {
        if (getObjectLength(avaibleVariations) > 1) {
            setShowSubmenu(prevstate => !prevstate);
        } else {
            addToCartClickHandler();
        }
    }
    const { add_to_cart, choise, features } = useSelector((state: RootState) => ({
        add_to_cart: state.PublicConfig.translations && state.PublicConfig.translations.add_to_cart ? state.PublicConfig.translations.add_to_cart : null,
        choise: state.PublicConfig.translations && state.PublicConfig.translations.choise ? state.PublicConfig.translations.choise : null,
        features: state.PublicConfig.features,
    }), shallowEqual);

    useEffect(() => {
        active !== showSubmenu && setShowSubmenu(false);
    }, [active]);

    const dispatch = useDispatch();
    
    const addToCartClickHandler = () => {
        dispatch(addToStoreCart());
        console.log('add to cart product id:', productId);
    }

    const showRestVariants = (avaibleVariations: Variations) => {
        if (!getObjectLength(avaibleVariations) || isObjectEmpty(features)) {
            return null;
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

    return <HoverPopupContainer active={active}>
        {showSubmenu && showRestVariants(avaibleVariations)}
        <BlackButton
            label={add_to_cart}
            clickHandler={onClickHandler}
        />
    </HoverPopupContainer>
}

export default withStyles(styles)(ShowAddToCartVariants);
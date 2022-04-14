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
import { Sale } from "../../../../../redux/Models/Product/Sale/Sale.model";

interface ShowAddToCartVariantsProps {
    active: boolean;
    avaibleVariations: Variations;
    productId: string;
    sale: Sale;
}

const ShowAddToCartVariants: React.FC<ShowAddToCartVariantsProps> = props => {
    const { active, avaibleVariations, productId, sale } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);

    const onClickHandler = () => {
        if (getObjectLength(avaibleVariations) > 1) {
            setShowSubmenu(prevstate => !prevstate);
        } else {
            dispatch(addToStoreCart(api, lang, productId, null, localstorageCartKey));
        }
    }
    const { addToCart, choiseLabel, features, api, lang, localstorageCartKey, cartProducts } = useSelector((state: RootState) => ({
        addToCart: state.PublicConfig.translations && state.PublicConfig.translations.addToCart ? state.PublicConfig.translations.addToCart : null,
        choiseLabel: state.PublicConfig.translations && state.PublicConfig.translations.choiseLabel ? state.PublicConfig.translations.choiseLabel : null,
        features: state.PublicConfig.features,
        api: state.SystemConfig.api,
        lang: state.User.language,
        localstorageCartKey: state.SystemConfig.localstorageKeys.cart,
        cartProducts: state.Cart.products
    }), shallowEqual);

    useEffect(() => {
        active !== showSubmenu && setShowSubmenu(false);
    }, [active]);

    const dispatch = useDispatch();

    const addToCartClickHandler = (variantId: string) => {
        const alreadyInCart = cartProducts[variantId] ? true : false;
        dispatch(addToStoreCart(api, lang, productId, variantId, localstorageCartKey, alreadyInCart));
        console.log('add to cart product id:', productId);
    }

    const showRestVariants = (avaibleVariations: Variations) => {
        if (!getObjectLength(avaibleVariations) || isObjectEmpty(features)) {
            return null;
        }
        const featureIdForSelect = Object.keys(features).find(featId => !features[featId].wishlist);
        const featureTitle = featureIdForSelect ? features[featureIdForSelect].featureTitle : '';

        return <div className={styles.selectOptionsCointainerRoot}>
            <div className={styles.selectOptionsCointainerChild}>
                <PopupTitle text={choiseLabel + ' ' + featureTitle} underline={true} />
                <div className={styles.selectOptionsCointainer}>
                    {/* {console.log(avaibleVariations)} */}
                    {Object.keys(avaibleVariations).map(variantId => {
                        const variant = avaibleVariations[variantId];
                        const variantCode = variant.variationCode;
                        const attribId = variantCode[featureIdForSelect].atribId;

                        const attribTitle = featureIdForSelect ? features[featureIdForSelect].atributes[attribId].attribTitle : null;
                        const attribTooltip = featureIdForSelect ? features[featureIdForSelect].atributes[attribId].attribTooltip : null;

                        return (
                            <div className={styles.selectOption} onClick={addToCartClickHandler.bind(this,variantId)} key={variantId}>
                                <ShowSizesText text={attribTitle} minitext={attribTooltip} />
                                <ShowPrice allPrices={variant.variationPrice} sale={sale}/>
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
            label={addToCart}
            clickHandler={onClickHandler}
        />
    </HoverPopupContainer>
}

export default withStyles(styles)(ShowAddToCartVariants);
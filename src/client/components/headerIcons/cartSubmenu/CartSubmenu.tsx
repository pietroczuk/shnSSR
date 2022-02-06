import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../client";
import BlackButton from "../../helpers/ui/blackButton/BlackButton";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";
import ScrollSubmenuContent from "../scrollSubmenuContent/ScrollSubmenuContent";

interface CartSubmenuProps {
    parrentWidth?: number,
    linkUrl?: string,
    clickHandler?: VoidFunction
}

const CartSubmenu: React.FC<CartSubmenuProps> = props => {
    const { parrentWidth, linkUrl, clickHandler } = props;

    const { cartLenght, cartLabel, gotoCart } = useSelector((state: RootState) => ({
        cartLenght: state.Cart.length,
        cartLabel: state.PublicConfig.translations.cartLabel,
        gotoCart: state.PublicConfig.translations.gotoCart
    }), shallowEqual)

    // const wishlist = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage)

    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={cartLabel}>
        {cartLenght ?
            <ScrollSubmenuContent listType="cart" clickHandler={clickHandler}/>
            :
            <p>Twoj koszyk jest nieststy pusty :(</p>
        }
        <Link to={linkUrl}>
            <BlackButton sizeEm={0.9} clickHandler={clickHandler} label={gotoCart} />
        </Link>
    </HeaderIconSubmenu>
}

export default CartSubmenu;
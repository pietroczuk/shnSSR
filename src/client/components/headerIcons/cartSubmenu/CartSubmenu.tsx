import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../client";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";

interface CartSubmenuProps {
    parrentWidth?: number,
    linkUrl?: string
}

const CartSubmenu: React.FC<CartSubmenuProps> = props => {
    const { parrentWidth } = props;

    const { cartLabel } = useSelector((state: RootState) => ({
        cartLabel: state.PublicConfig.translations.cartLabel
    }))

    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={cartLabel}>
        koszyk itd
    </HeaderIconSubmenu>
}

export default CartSubmenu;
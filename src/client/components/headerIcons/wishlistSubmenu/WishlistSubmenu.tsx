import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../client";
import BlackButton from "../../helpers/ui/blackButton/BlackButton";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";
import ScrollSubmenuContent from "../scrollSubmenuContent/ScrollSubmenuContent";

interface WishlistSubmenuProps {
    parrentWidth?: number
}

const WishlistSubmenu: React.FC<WishlistSubmenuProps> = props => {
    const { parrentWidth } = props;

    const { wishlistLabel, wishlistLenght } = useSelector((state: RootState) => ({
        wishlistLabel: state.PublicConfig.translations.wishlistLabel,
        wishlistLenght: state.Wishlist.length
    }))

    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={wishlistLabel}>
        {wishlistLenght ? 
        <ScrollSubmenuContent listType="wishlist"/>
        :
        <p>Twoja lista jest niestety pusta :(</p>
        }

        <BlackButton sizeEm={0.9} clickHandler={()=>{console.log('klik')}} label="idz do listy" />
    </HeaderIconSubmenu>
}

export default WishlistSubmenu;
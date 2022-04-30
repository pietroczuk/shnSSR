import { FC } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../client";
import BlackButton from "../../helpers/ui/blackButton/BlackButton";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";
import ScrollSubmenuContent from "../scrollSubmenuContent/ScrollSubmenuContent";

interface WishlistSubmenuProps {
    parrentWidth?: number,
    linkUrl?: string,
    clickHandler?: VoidFunction
}

const WishlistSubmenu: FC<WishlistSubmenuProps> = props => {
    const { parrentWidth, linkUrl, clickHandler } = props;

    const { wishlistLenght, wishlistLabel, gotoWishlist } = useSelector((state: RootState) => ({
        wishlistLenght: state.Wishlist.length,
        wishlistLabel: state.PublicConfig.translations.wishlistLabel,
        gotoWishlist: state.PublicConfig.translations.gotoWishlist
    }), shallowEqual)

    // const wishlist = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage)

    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={wishlistLabel}>
        {wishlistLenght ?
            <ScrollSubmenuContent listType="wishlist" clickHandler={clickHandler} />
            :
            <p>Twoja lista jest niestety pusta :(</p>
        }
        <Link to={linkUrl}>
            <BlackButton fontSize="0.9em" clickHandler={clickHandler} label={gotoWishlist} uppercase={true} />
        </Link>
    </HeaderIconSubmenu>
}

export default WishlistSubmenu;
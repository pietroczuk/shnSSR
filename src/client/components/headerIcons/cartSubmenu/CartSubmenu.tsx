import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../client";
import BlackButton from "../../helpers/ui/blackButton/BlackButton";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";
import ScrollSubmenuContent from "../scrollSubmenuContent/ScrollSubmenuContent";
import styles from './cartSubmenu.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { calulateTotalProductPrice, calulateTotalSaveMoney, formatPrice } from "../../../utils/utilsFrondend";
import Cut from "../../svg/icons/Cut";

interface CartSubmenuProps {
    parrentWidth?: number,
    linkUrl?: string,
    clickHandler?: VoidFunction
}

const CartSubmenu: React.FC<CartSubmenuProps> = props => {
    const { parrentWidth, linkUrl, clickHandler } = props;

    const {
        products,
        cartLenght,
        currency, allCurrencies,
        // now,
        cartLabel, gotoCart,
        totalLabel, taxInclude, tax, taxPercent, saveMoney,

    } = useSelector((state: RootState) => ({
        products: state.Cart.products,
        cartLenght: state.Cart.length,

        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,

        // now: state.User.today.date, 

        cartLabel: state.PublicConfig.translations.cartLabel,
        gotoCart: state.PublicConfig.translations.gotoCart,
        totalLabel: state.PublicConfig.translations.total,
        taxInclude: state.PublicConfig.translations.taxInclude,
        tax: state.PublicConfig.translations.tax,
        saveMoney: state.PublicConfig.translations.saveMoney,
        taxPercent: state.PublicConfig.config.taxPercent,
    }), shallowEqual)

    const total = cartLenght ? formatPrice(calulateTotalProductPrice(products, currency, allCurrencies), currency, allCurrencies) : '';
    const totalSaveMoney = cartLenght ? formatPrice(calulateTotalSaveMoney(products, currency, allCurrencies), currency, allCurrencies) : '';
    // const wishlist = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage)

    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={cartLabel}>
        {cartLenght ?
            <ScrollSubmenuContent listType="cart" clickHandler={clickHandler} />
            :
            <p>Twoj koszyk jest nieststy pusty :(</p>
        }
        {totalSaveMoney !== '' && cartLenght &&
            <div className={styles.saveMoneyCont}>
                <div className={styles.label}>
                    {saveMoney}
                </div>
                <div className={styles.saveCont}>
                    <div className={styles.icon}>
                        <Cut />
                    </div>
                    <div className={styles.price}>
                        {totalSaveMoney}
                    </div>
                </div>
            </div>
        }
        {cartLenght &&
            <div className={styles.totalContener}>
                <div className={styles.label}>
                    <div className={styles.totalLabel}>{totalLabel}</div>
                    <div className={styles.tax}>{taxInclude} {taxPercent}% {tax}</div>
                </div>
                <div className={styles.price}>{total}</div>
            </div>
        }
        <Link to={linkUrl}>
            <BlackButton sizeEm={0.9} clickHandler={clickHandler} label={gotoCart} />
        </Link>
    </HeaderIconSubmenu>
}

export default withStyles(styles)(CartSubmenu);
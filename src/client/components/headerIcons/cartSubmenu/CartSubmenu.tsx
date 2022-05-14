import { FC } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../client";
import BlackButton from "../../helpers/ui/blackButton/BlackButton";
import HeaderIconSubmenu from "../headerIconSubmenu/HeaderIconSubmenu";
import ScrollSubmenuContent from "../scrollSubmenuContent/ScrollSubmenuContent";
import styles from './cartSubmenu.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { calulateTotalProductPrice, calulateTotalSaveMoney, formatPrice, getPriceByCurrency } from "../../../utils/utilsFrondend";
import Cut from "../../svg/icons/Cut";

interface CartSubmenuProps {
    parrentWidth?: number,
    linkUrl?: string,
    clickHandler?: VoidFunction
}

const CartSubmenu: FC<CartSubmenuProps> = props => {
    const { parrentWidth, linkUrl, clickHandler } = props;

    const {
        products,
        cartLenght,
        currency, allCurrencies,
        // now,
        cartLabel, gotoCart,
        totalLabel, taxInclude, tax, taxPercent, youSave,

        delivery,
        to,
        change,

        deliveries,

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
        youSave: state.PublicConfig.translations.youSave,
        delivery: state.PublicConfig.translations.delivery,
        to: state.PublicConfig.translations.to,
        change: state.PublicConfig.translations.change,

        taxPercent: state.PublicConfig.config.taxPercent,

        deliveries: state.PublicConfig.delivery

    }), shallowEqual)

    const total = cartLenght ? formatPrice(calulateTotalProductPrice(products, currency, allCurrencies), currency, allCurrencies) : '';
    const totalSaveMoney = cartLenght ? formatPrice(calulateTotalSaveMoney(products, currency, allCurrencies), currency, allCurrencies) : '';
    // const wishlist = rawSlug ? prepUrlFromConfigSlug(language, null, null, null, rawSlug, isMultilanguage)
    const deliveryPrice = formatPrice(getPriceByCurrency(deliveries.globalMinPrice, currency, allCurrencies), currency, allCurrencies);
    return <HeaderIconSubmenu parrentWidth={parrentWidth} align="right" title={cartLabel}>
        {cartLenght ?
            <ScrollSubmenuContent listType="cart" clickHandler={clickHandler} />
            :
            <p>Twoj koszyk jest nieststy pusty :(</p>
        }
        {totalSaveMoney !== '' && cartLenght &&
            <div className={styles.saveMoneyCont}>
                <div className={styles.label}>
                    {youSave}
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
        {cartLenght &&
            <div className={styles.deliveryContener}>
                <div className={styles.labelContener}>
                    <div className={styles.label}>
                        {delivery} {to}:
                    </div>
                    <div className={styles.country}>
                        Polska
                    </div>
                    <div className={styles.change}>
                        <BlackButton
                            clickHandler={() => { }}
                            label={change}
                            fontSize="0.8em"
                            backgroundColor="#eee"
                            hoverBackgroundColor="#f5f5f5"
                            color="#000"
                            uppercase={true}
                            fontWeight={600}
                            padding="0.4em 1.2em"
                        />
                    </div>
                </div>
                <div className={styles.price}>
                    + {deliveryPrice}
                </div>
            </div>
        }
        <Link to={linkUrl}>
            <BlackButton fontSize="0.9em" clickHandler={clickHandler} label={gotoCart} uppercase={true} />
        </Link>
    </HeaderIconSubmenu>
}

export default withStyles(styles)(CartSubmenu);
import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showPrice.scss';
import { useSelector, shallowEqual } from "react-redux";
import { checkTrueSale, formatPrice, getPriceByCurrency, getPromoPrice } from "../../../../utils/utilsFrondend";
import { RootState } from "../../../../client";
import { Sale } from "../../../../redux/Models/Product/Sale/Sale.model";

interface ShowPriceProps {
    allPrices: {
        [key: string]: string
    }
    quantity?: number;
    finalQuantity?: number;
    sale: Sale;
}

const ShowPrice: React.FC<ShowPriceProps> = (props) => {
    const { allPrices, quantity, sale, finalQuantity } = props;

    const { currency, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const showPromo = useSelector((state: RootState) => {
        const now = state.User.today.date
        return checkTrueSale(sale, now)
    });

    const price = getPriceByCurrency(allPrices, currency, allCurrencies);
    const finalOemPrice = finalQuantity ? +price * finalQuantity : +price;
    const formatedPrice = formatPrice(finalOemPrice, currency, allCurrencies);

    const promoPrice = showPromo ? getPromoPrice(price, sale, true, true, finalQuantity) : 0;

    return <div className={`${styles.price} ${quantity ? styles.quantity : ''}`}>
        {quantity ? quantity + ' x ' : ''}
        {showPromo &&
            <div className={quantity ? '' : styles.promo}>
                {
                    formatPrice(promoPrice, currency, allCurrencies)}
            </div>
        }
        {!showPromo ?
            formatedPrice :
            quantity ? '' :
                <del>{formatPrice(finalOemPrice.toFixed(2), currency, allCurrencies)}</del>
        }
    </div>
}

export default withStyles(styles)(ShowPrice);
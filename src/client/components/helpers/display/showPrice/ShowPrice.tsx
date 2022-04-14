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
    sale: Sale;
}

const ShowPrice: React.FC<ShowPriceProps> = (props) => {
    const { allPrices, quantity, sale } = props;

    const { currency, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const showPromo = useSelector((state: RootState) => {
        const now = state.User.today.date
        return checkTrueSale(sale, now)
    });

    const price = getPriceByCurrency(allPrices, currency, allCurrencies);
    const formatedPrice = formatPrice(price, currency, allCurrencies);

    return <div className={styles.price}>
        {quantity ? quantity + ' x ' : ''}
        {showPromo ? <del>{formatedPrice}</del> : formatedPrice}
        {showPromo && formatPrice(getPromoPrice(price, sale), currency, allCurrencies)}
    </div>
}

export default withStyles(styles)(ShowPrice);
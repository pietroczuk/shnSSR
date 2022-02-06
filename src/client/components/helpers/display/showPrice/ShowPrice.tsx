import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showPrice.scss';
import { useSelector, shallowEqual } from "react-redux";
import { getPriceByCurrency } from "../../../../utils/utilsFrondend";
import { RootState } from "../../../../client";

interface ShowPriceProps {
    allPrices: {
        [key: string]: string
    }
    quantity?: number;
}

const ShowPrice: React.FC<ShowPriceProps> = (props) => {
    const { allPrices, quantity } = props;

    const { currency, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const price = getPriceByCurrency(allPrices, currency, allCurrencies);

    return <div className={styles.price}>{quantity ? quantity + ' x ' : ''}{price}</div>
}

export default withStyles(styles)(ShowPrice);
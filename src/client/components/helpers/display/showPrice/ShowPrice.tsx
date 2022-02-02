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
}

const ShowPrice: React.FC<ShowPriceProps> = (props) => {
    const { allPrices } = props;

    const { currency, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const price = getPriceByCurrency(allPrices, currency, allCurrencies);

    // console.log('allPrices', allPrices, price);
    return <div className={styles.price}>{price}</div>
}

export default withStyles(styles)(ShowPrice);
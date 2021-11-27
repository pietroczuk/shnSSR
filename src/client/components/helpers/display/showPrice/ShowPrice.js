import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showPrice.scss';
import { useSelector, shallowEqual } from "react-redux";
import { getPriceByCurrency } from "../../../../utils/utilsFrondend";

const ShowPrice = props => {
    const { allPrices } = props;

    const { userCurrency, currency } = useSelector(state => ({
        userCurrency: state.User.currency,
        currency: state.SystemConfig.currency,
    }), shallowEqual);

    const price = getPriceByCurrency(allPrices, userCurrency, currency);

    return <div className={styles.price}>{price}</div>
}

export default withStyles(styles)(ShowPrice);
import React from 'react';
import styles from './currencySwitcher.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setUserCurrency } from '../../redux/actions/actionCreators';

const CurrencySwitcher = (props) => {
    const all_config_currencies = useSelector(state => state.config.currency);
    const dispatch = useDispatch();

    const currencyClickHandler = (currency) => {
        dispatch(setUserCurrency(currency, all_config_currencies));
    }
    return <div>
        <ul>
            {Object.entries(all_config_currencies).map(([curr_key, curr_val]) => <li key={curr_key} onClick={()=>currencyClickHandler(curr_key)}>{curr_val.label}</li>)}
        </ul>
    </div>
}

export default withStyles(styles)(CurrencySwitcher);

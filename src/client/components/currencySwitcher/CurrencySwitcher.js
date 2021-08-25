import React from 'react';
import styles from './currencySwitcher.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { set_global_currency } from '../../redux/actions/all_actions';

const CurrencySwitcher = (props) => {
    const all_config_currencies = useSelector(state => state.config.currency);
    const dispatch = useDispatch();

    const currencyClickHandler = (currency) => {
        dispatch(set_global_currency(currency, all_config_currencies));
    }
    return <div>
        <ul>
            {Object.entries(all_config_currencies).map(([curr_key, curr_val]) => <li key={curr_key} onClick={()=>currencyClickHandler(curr_key)}>{curr_val.label}</li>)}
        </ul>
    </div>
}

export default withStyles(styles)(CurrencySwitcher);

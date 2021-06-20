import React from 'react';
import styles from './currencySwitcher.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { set_global_currency } from '../../redux/actions/all_actions';

const CurrencySwitcher = (props) => {
    const { all_config_currencies } = props;
    // redux
    const { set_global_currency } = props;

    const currencyClickHandler = (currency) => {
        console.log('poszlo', currency, all_config_currencies);
        set_global_currency(currency, all_config_currencies);
    }
    return <div>
        <ul>
            {Object.entries(all_config_currencies).map(([curr_key, curr_val]) => <li key={curr_key} onClick={()=>currencyClickHandler(curr_key)}>{curr_val.label}</li>)}
        </ul>
    </div>
}

const mapStateToProps = state => ({
    all_config_currencies: state.config.currency,
    // page: state.page
});
export default
    connect(mapStateToProps, { set_global_currency })
        (withStyles(styles)(CurrencySwitcher))

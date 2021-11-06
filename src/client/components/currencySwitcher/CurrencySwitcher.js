import React, { useState } from 'react';
// import styles from './currencySwitcher.scss';
import styles from '../languageSwitcher/languageSwitcher.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

// import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setUserCurrency } from '../../redux/actions/actionCreators';

import CurrencyIcon from '../svg/icons/CurrencyIcon';

const CurrencySwitcher = (props) => {
    const { all_config_currencies, user_currency, cookieCurrencyKey } = useSelector(state => ({
        all_config_currencies: state.SystemConfig.currency,
        user_currency: state.User.currency,
        cookieCurrencyKey: state.SystemConfig.cookies_keys.user_currency,

    }));

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const openSubmenuHandler = () => {
        setOpenSubmenu(true);
    }
    const closeSubmenuHandler = () => {
        setOpenSubmenu(false);
    }

    const dispatch = useDispatch();

    const currencyClickHandler = (currency, cookieCurrencyKey) => {
        closeSubmenuHandler();
        dispatch(setUserCurrency(currency, all_config_currencies, cookieCurrencyKey));
    }
    return <div className={styles.switcher}
        onMouseOver={openSubmenuHandler}
        onMouseLeave={closeSubmenuHandler}
    >
        <CurrencyIcon />
        <span className={styles.chosenLabel}>{user_currency}</span>
        {openSubmenu && <div className={styles.submenu}>
            <ul className={styles.list}>
                {Object.entries(all_config_currencies).map(
                    ([curr_key, curr_val]) =>
                        <li
                            key={curr_key}
                            className={`${(curr_key === user_currency ? styles.active : '')}`}
                            onClick={() => currencyClickHandler(curr_key, cookieCurrencyKey)}>
                            <span>{curr_val.label}</span>
                        </li>
                )}
            </ul>
        </div>}
    </div>
}

export default withStyles(styles)(CurrencySwitcher);

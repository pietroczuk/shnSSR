import { FC, useState, useEffect } from 'react';

import styles from '../languageSwitcher/languageSwitcher.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUserCurrency } from '../../redux/actions/actionCreators';
import { getCookie, setCookie } from '../../utils/utilsFrondend';

import CurrencyIcon from '../svg/icons/CurrencyIcon';
import { RootState } from '../../client';

const CurrencySwitcher: FC = () => {
    const { currency, cookieCurrencyKey, all_config_currencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        cookieCurrencyKey: state.SystemConfig.cookies_keys.user_currency,
        all_config_currencies: state.SystemConfig.currency,
        // user_currency: state.User.currency,
    }), shallowEqual);

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const openSubmenuHandler = () => {
        setOpenSubmenu(true);
    }
    const closeSubmenuHandler = () => {
        setOpenSubmenu(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const cookieCurr = getCookie(cookieCurrencyKey);
        currency && (currency !== cookieCurr) && setCookie(cookieCurrencyKey, currency);
    })

    const currencyClickHandler = (currency: string, cookieCurrencyKey: string) => {
        closeSubmenuHandler();
        dispatch(setUserCurrency(currency, all_config_currencies, cookieCurrencyKey));
    }
    return <div className={styles.switcher}
        onMouseOver={openSubmenuHandler}
        onMouseLeave={closeSubmenuHandler}
    >
        <CurrencyIcon />
        <span className={styles.chosenLabel}>{currency}</span>
        {openSubmenu && <div className={styles.submenu}>
            <ul className={styles.list}>
                {Object.entries(all_config_currencies).map(
                    ([curr_key, curr_val]) =>
                        <li
                            key={curr_key}
                            className={`${(curr_key === currency ? styles.active : '')}`}
                            onClick={() => currencyClickHandler(curr_key, cookieCurrencyKey)}>
                            <span>{curr_val.label}</span>
                        </li>
                )}
            </ul>
        </div>}
    </div>
}

export default withStyles(styles)(CurrencySwitcher);

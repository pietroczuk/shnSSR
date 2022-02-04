import { FC, useState, useEffect } from 'react';

import styles from '../languageSwitcher/languageSwitcher.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getCookie, setCookie } from '../../utils/utilsFrondend';

import CurrencyIcon from '../svg/icons/CurrencyIcon';
import { RootState } from '../../client';
import { setUserCurrency } from '../../redux/actionCreators/user/user.ac';

const CurrencySwitcher: FC = () => {
    const { currency, cookieCurrencyKey, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        cookieCurrencyKey: state.SystemConfig.cookiesKeys.userCurrency,
        allCurrencies: state.SystemConfig.allCurrencies,
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
        dispatch(setUserCurrency(currency, allCurrencies, cookieCurrencyKey));
    }
    return <div className={styles.switcher}
        onMouseOver={openSubmenuHandler}
        onMouseLeave={closeSubmenuHandler}
    >
        <CurrencyIcon />
        <span className={styles.chosenLabel}>{currency}</span>
        {openSubmenu && <div className={styles.submenu}>
            <ul className={styles.list}>
                {Object.entries(allCurrencies).map(
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

import React, { useState } from 'react';
import styles from './header.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Topbar from './topbar/Topbar.js';
import Logo from '../svg/logo/Logo';
import InteractiveIcon from '../InteractiveIcon/InteractiveIcon';
import CartIcon from '../svg/icons/CartIcon';
import WishlistIcon from '../svg/icons/WishlistIcon';
import SearchIcon from '../svg/icons/SearchIcon';

import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import CurrencySwitcher from '../currencySwitcher/CurrencySwitcher';

import MenuTop from '../menuTop/MenuTop';
import { getObjectLength } from '../../utils/utilsFrondend';

import { useSelector, shallowEqual } from 'react-redux';

import { pageTypes } from '../../utils/utilsFrondend';

const Header = ({ white, whiteTopbar }) => {
    const [topbarOpen, setTopbarOpen] = useState(true);

    const { all_config_languages, all_config_currencies, } = useSelector(state => ({
        all_config_languages: state.SystemConfig.language,
        all_config_currencies: state.SystemConfig.currency,
    }), shallowEqual);

    const setTopbarOpenHandler = () => {
        setTopbarOpen(prevstate => !prevstate);
    }
    // console.log('header location', location);
    return (
        <header id="root_header" className={`${styles.rootHeader} ${!white ? styles.darkHeader : ''}`}>
            {console.log('render header')}
            {topbarOpen && <Topbar closeHandler={setTopbarOpenHandler} white={whiteTopbar} />}
            <div className={styles.headerContent}>
                <Logo white={!white} miniLogo={false} />
                {/* <div onClick={setTopbarOpenHandler}>moj header</div> */}
                <MenuTop />
                <div className={styles.headerRight}>
                    {all_config_languages && getObjectLength(all_config_languages) > 1 && <LanguageSwitcher />}
                    {all_config_currencies && getObjectLength(all_config_currencies) > 1 && <CurrencySwitcher />}
                    <InteractiveIcon hoverBg={true} white={!white}><SearchIcon /></InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white} type={pageTypes.wishlist}>
                        <WishlistIcon />
                    </InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white} type={pageTypes.cart}>
                        <CartIcon />
                    </InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
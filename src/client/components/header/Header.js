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

import { useSelector } from 'react-redux';

const Header = ({ white, whiteTopbar, language, location }) => {
    const [topbarOpen, setTopbarOpen] = useState(true);

    const { all_config_languages, all_config_currencies } = useSelector(state => ({
        all_config_languages: state.SystemConfig.language,
        all_config_currencies: state.SystemConfig.currency,
    }));

    const setTopbarOpenHandler = () => {
        // console.log('ok');
        setTopbarOpen(prevstate => !prevstate);
    }

    return (
        <header id="root_header" className={`${styles.rootHeader} ${!white ? styles.darkHeader : ''}`}>
            {topbarOpen && <Topbar closeHandler={setTopbarOpenHandler} white={whiteTopbar} />}
            <div className={styles.headerContent}>
                <Logo white={!white} miniLogo={false} link={language} />
                {/* <div onClick={setTopbarOpenHandler}>moj header</div> */}
                <MenuTop language={language} location={location}/>
                <div className={styles.headerRight}>
                    {all_config_languages && Object.keys(all_config_languages).length > 1 && <LanguageSwitcher />}
                    {all_config_currencies && Object.keys(all_config_currencies).length > 1 && <CurrencySwitcher />}
                    <InteractiveIcon hoverBg={true} white={!white}><SearchIcon /></InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white}><WishlistIcon /></InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white}><CartIcon /></InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
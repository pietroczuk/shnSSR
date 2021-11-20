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

import { useSelector } from 'react-redux';

const Header = ({ white, whiteTopbar, language, location }) => {
    const [topbarOpen, setTopbarOpen] = useState(true);

    const {
        all_config_languages,
        all_config_currencies,
        wishlistLength,
        special_pages_urls,
        multilanguage,
        multicurrency
    } = useSelector(state => ({
        all_config_languages: state.SystemConfig.language,
        all_config_currencies: state.SystemConfig.currency,
        wishlistLength: state.Wishlist.length,
        special_pages_urls: state.SystemConfig.special_pages_urls,
        multilanguage: state.SystemConfig.multilanguage,
        multicurrency: state.SystemConfig.multicurrency
    }));

    const setTopbarOpenHandler = () => {
        setTopbarOpen(prevstate => !prevstate);
    }
    return (
        <header id="root_header" className={`${styles.rootHeader} ${!white ? styles.darkHeader : ''}`}>
            {topbarOpen && <Topbar closeHandler={setTopbarOpenHandler} white={whiteTopbar} />}
            <div className={styles.headerContent}>
                <Logo
                    white={!white}
                    miniLogo={false}
                    special_pages_urls={special_pages_urls.homepage[language]}
                    language={language}
                    multilanguage={multilanguage}
                />
                {/* <div onClick={setTopbarOpenHandler}>moj header</div> */}
                <MenuTop language={language} location={location} />
                <div className={styles.headerRight}>
                    {all_config_languages && getObjectLength(all_config_languages) > 1 && <LanguageSwitcher />}
                    {all_config_currencies && getObjectLength(all_config_currencies) > 1 && <CurrencySwitcher />}
                    <InteractiveIcon hoverBg={true} white={!white}><SearchIcon /></InteractiveIcon>
                    <InteractiveIcon
                        hoverBg={true}
                        white={!white}
                        badgeNumber={wishlistLength}
                        special_pages_urls={special_pages_urls.wishlist[language]}
                        language={language}
                        multilanguage={multilanguage}
                    >
                        <WishlistIcon />
                    </InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white}><CartIcon /></InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
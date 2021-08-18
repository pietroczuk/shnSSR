import React, { useState } from 'react';
import styles from './header.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Topbar from './topbar/Topbar.js';
import Logo from '../svg/logo/Logo';
import InteractiveIcon from '../InteractiveIcon/InteractiveIcon';
import CartIcon from '../InteractiveIcon/icons/CartIcon';
import WishlistIcon from '../InteractiveIcon/icons/WishlistIcon';
import SearchIcon from '../InteractiveIcon/icons/SearchIcon';

import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import CurrencySwitcher from '../currencySwitcher/CurrencySwitcher';

import MenuTop from '../menuTop/MenuTop';

const Header = ({ white, whiteTopbar, language, location }) => {
    const [topbarOpen, setTopbarOpen] = useState(true);

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
                    <LanguageSwitcher />
                    <CurrencySwitcher />
                    <InteractiveIcon hoverBg={true} white={!white}><SearchIcon /></InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white}><WishlistIcon /></InteractiveIcon>
                    <InteractiveIcon hoverBg={true} white={!white}><CartIcon /></InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
// export default Header;
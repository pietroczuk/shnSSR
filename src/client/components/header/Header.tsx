import React, { useState } from 'react';
import styles from './header.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import Topbar from './topbar/Topbar';
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
import { RootState } from '../../client';

interface HeaderProps {
    isDarkBackground: boolean;
    isWhiteTopbar: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkBackground, isWhiteTopbar }) => {
    const [isTopbarOpen, setIsTopbarOpen] = useState(true);

    const { all_config_languages, all_config_currencies } = useSelector((state: RootState) => ({
        all_config_languages: state.SystemConfig.language,
        all_config_currencies: state.SystemConfig.currency,
    }), shallowEqual);

    const setIsTopbarOpenHandler = () => {
        setIsTopbarOpen(prevstate => !prevstate);
    }

    const showLanguageSwitcher = all_config_languages && getObjectLength(all_config_languages) > 1;
    const showCurrencySwitcher = all_config_currencies && getObjectLength(all_config_currencies) > 1;

    return (
        <header id="root_header" className={`${styles.rootHeader} ${isDarkBackground ? styles.darkHeader : ''}`}>
            {isTopbarOpen && <Topbar closeHandler={setIsTopbarOpenHandler} isWhiteTopbar={isWhiteTopbar} />}
            <div className={styles.headerContent}>
                <Logo isDarkBackground={isDarkBackground} isMiniLogo={false} />
                <MenuTop />
                <div className={styles.headerRight}>
                    {showLanguageSwitcher && <LanguageSwitcher />}
                    {showCurrencySwitcher && <CurrencySwitcher />}
                    <InteractiveIcon hoverBg={true} isDarkBackground={isDarkBackground}>
                        <SearchIcon />
                    </InteractiveIcon>
                    <InteractiveIcon hoverBg={true} isDarkBackground={isDarkBackground} linkPageType={pageTypes.wishlist}>
                        <WishlistIcon />
                    </InteractiveIcon>
                    <InteractiveIcon hoverBg={true} isDarkBackground={isDarkBackground} linkPageType={pageTypes.cart}>
                        <CartIcon />
                    </InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
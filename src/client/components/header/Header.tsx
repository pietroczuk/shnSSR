import { FC, useState } from 'react';
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

const Header: FC<HeaderProps> = ({ isDarkBackground, isWhiteTopbar }) => {
    const [isTopbarOpen, setIsTopbarOpen] = useState(true);

    const { allLanguages, allCurrencies } = useSelector((state: RootState) => ({
        allLanguages: state.SystemConfig.allLanguages,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const setIsTopbarOpenHandler = () => {
        setIsTopbarOpen(prevstate => !prevstate);
    }

    const showLanguageSwitcher = allLanguages && getObjectLength(allLanguages) > 1;
    const showCurrencySwitcher = allCurrencies && getObjectLength(allCurrencies) > 1;

    return (
        <header id="root_header" className={`${styles.rootHeader} ${isDarkBackground ? styles.darkHeader : ''}`}>
            {isTopbarOpen && <Topbar closeHandler={setIsTopbarOpenHandler} isWhiteTopbar={isWhiteTopbar} />}
            <div className={styles.headerContent}>
                <Logo isDarkBackground={isDarkBackground} isMiniLogo={false} />
                <MenuTop />
                <div className={styles.headerRight}>
                    {showLanguageSwitcher && <LanguageSwitcher />}
                    {showCurrencySwitcher && <CurrencySwitcher />}
                    <InteractiveIcon isHoverBackground={true} isDarkBackground={isDarkBackground} >
                        <SearchIcon />
                    </InteractiveIcon>
                    <InteractiveIcon isHoverBackground={true} isDarkBackground={isDarkBackground} linkPageType={pageTypes.wishlist}>
                        <WishlistIcon />
                    </InteractiveIcon>
                    <InteractiveIcon isHoverBackground={true} isDarkBackground={isDarkBackground} linkPageType={pageTypes.cart}>
                        <CartIcon />
                    </InteractiveIcon>
                </div>
            </div>
        </header>
    )
}
export default withStyles(styles)(Header);
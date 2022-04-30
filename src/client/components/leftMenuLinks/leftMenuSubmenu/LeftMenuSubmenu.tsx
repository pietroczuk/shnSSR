import { FC, useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from '../leftMenuLinks.scss';

import { prepUrlFromConfigSlug } from '../../../utils/utilsFrondend';

import ArrowDown from '../../svg/icons/ArrowDown';
import { PageTypePrefixUrls } from '../../../redux/Models/SystemConfig/PageTypePrefixUrls/PageTypePrefixUrls.model';
import { MenuItem } from '../../../redux/Models/PublicConfig/Menu/MenuItem/MenuItem.model';
import { useLocation } from 'react-router-dom';

interface LeftMenuSubmenuProps {
    menuItem: MenuItem;
    prepareLabelMenu: (label: string, color?: string, expand?: boolean, bolder?: boolean) => JSX.Element;
    prepareMenuLink: (menuItem: MenuItem) => JSX.Element;
    // pathname: string;
    language: string;
    pageTypePrefixUrls: PageTypePrefixUrls;
    isMultilanguage: boolean;
}

const LeftMenuSubmenu: FC<LeftMenuSubmenuProps> = props => {
    const { menuItem, prepareLabelMenu, prepareMenuLink,
        // pathname, 
        language, pageTypePrefixUrls, isMultilanguage } = props;
    const { items, label, color } = menuItem;

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const toogleSubmenuHandler = () => {
        setOpenSubmenu(prevstate => !prevstate);
    }
    const openSubmenuHandler = (open: boolean) => {
        setOpenSubmenu(open);
    }
    const { pathname } = useLocation();

    useEffect(() => {
        const foudmatch = Array.isArray(items) ? items.some(item => {
            if (item.url && pathname === prepUrlFromConfigSlug(language, pageTypePrefixUrls, item.type, null, item.url, isMultilanguage)) {
                openSubmenuHandler(true);
                return true;
            }
            return false;
        }) : false;
        if (!foudmatch && openSubmenu) {
            openSubmenuHandler(false);
        }
    }, [pathname])

    return (
        <div>
            <div onClick={toogleSubmenuHandler} className={styles.label_with_icon}>
                {prepareLabelMenu(label, color, true, openSubmenu)}
                <div className={`${styles.icon} ${openSubmenu ? styles.rotate : ''}`}><ArrowDown /></div>
            </div>
            <div className={`${styles.submenu + ' ' + (openSubmenu ? styles.open_submenu : '')}`}>
                <ul>
                    {
                        Array.isArray(items) && items.map((it, index) =>
                            <li key={index}>
                                {prepareMenuLink(it)}
                            </li>
                        )
                    }
                </ul>
            </div >
        </div >
    )
}
export default withStyles(styles)(LeftMenuSubmenu);
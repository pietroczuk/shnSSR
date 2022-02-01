import React, { useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from '../leftMenuLinks.scss';

import { prepUrlFromConfigSlug } from '../../../utils/utilsFrondend';

import ArrowDown from '../../svg/icons/ArrowDown';
import { MenuItem } from '../../../redux/types/publicConfig.types';
import { Urls } from '../../../redux/types/systemConfig.types';

interface LeftMenuSubmenuProps {
    elem: MenuItem;
    prepareLabelMenu: (label: string, color?: string, expand?: boolean, bolder?: boolean) => JSX.Element;
    prepareMenuLink: (elem: MenuItem) => JSX.Element;
    pathname: string;
    language: string;
    slug_urls: Urls;
    isMultilanguage: boolean;
}

const LeftMenuSubmenu: React.FC<LeftMenuSubmenuProps> = props => {
    const { elem, prepareLabelMenu, prepareMenuLink, pathname, language, slug_urls, isMultilanguage } = props;
    const { items, label, color } = elem;

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const toogleSubmenuHandler = () => {
        setOpenSubmenu(prevstate => !prevstate);
    }
    const openSubmenuHandler = (open: boolean) => {
        setOpenSubmenu(open);
    }
    useEffect(() => {
        const foudmatch = Array.isArray(items) ? items.some(item => {
            if (item.url && pathname === prepUrlFromConfigSlug(language, slug_urls, item.type, null, item.url, isMultilanguage)) {
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
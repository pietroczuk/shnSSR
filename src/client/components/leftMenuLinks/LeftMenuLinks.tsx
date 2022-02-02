import React from 'react';
import styles from './leftMenuLinks.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, shallowEqual } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import LeftMenuSubmenu from './leftMenuSubmenu/LeftMenuSubmenu';
import { RootState } from '../../client';
import { MenuItem } from '../../redux/Models/PublicConfig/Menu/MenuItem/MenuItem.model';

interface LeftMenuLinksProps {
    location: Location | any;
}

const LeftMenuLinks: React.FC<LeftMenuLinksProps> = props => {

    const { menu_items, language, pageTypePrefixUrls, isMultilanguage } = useSelector((state: RootState) => ({
        menu_items: state.PublicConfig.menu!.side === 'top' ? state.PublicConfig.menu!.top : state.PublicConfig.menu!.side,
        language: state.User.language,
        pageTypePrefixUrls: state.SystemConfig.pageTypePrefixUrls,
        isMultilanguage: state.SystemConfig.isMultilanguage
    }), shallowEqual)

    const { location } = props;
    const pathname = location ? location.pathname : '';


    const prepareSubmenu = (menuItem: MenuItem) => {
        return <LeftMenuSubmenu
            menuItem={menuItem}
            pathname={pathname}
            pageTypePrefixUrls={pageTypePrefixUrls}
            language={language}
            prepareLabelMenu={prepareLabelMenu}
            prepareMenuLink={prepareMenuLink}
            isMultilanguage={isMultilanguage}
        />
    }
    const prepareMenuLink = (elem: MenuItem) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, pageTypePrefixUrls, type, null, url, isMultilanguage);
            return (
                <NavLink to={new_url} activeClassName={styles.active} className={styles.side_link_container}>
                    {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
                </NavLink>
            )
        } else {
            return items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color);
        }
    }
    const prepareLabelMenu = (label: string, color?: string, expand = false, bolder = false) => {
        const customColor = !color ? {} : { color: color };
        return <div style={customColor} className={`${styles.side_label} ${expand ? styles.side_link_container : ''} ${bolder ? styles.bolder : ''}`}>{label}</div>
    }

    return <nav className={styles.container}>
        <ul className={styles.side_list}>
            {Array.isArray(menu_items) && menu_items.map((elem, index) =>
                <li key={index}>
                    {prepareMenuLink(elem)}
                </li>
            )}
        </ul>
    </nav>
}

export default withStyles(styles)(LeftMenuLinks);

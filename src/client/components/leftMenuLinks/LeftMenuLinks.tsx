import React from 'react';
import styles from './leftMenuLinks.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, shallowEqual } from 'react-redux';

import { NavLink, RouteComponentProps } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import LeftMenuSubmenu from './leftMenuSubmenu/LeftMenuSubmenu';
import { RootState } from '../../client';
import { MenuItem } from '../../redux/types/publicConfig.types';

const LeftMenuLinks: React.FC<RouteComponentProps> = props => {

    const { menu_items, language, slug_urls, multilanguage } = useSelector((state: RootState) => ({
        menu_items: state.PublicConfig.menu!.side === 'top' ? state.PublicConfig.menu!.top : state.PublicConfig.menu!.side,
        language: state.User.language,
        slug_urls: state.SystemConfig.urls,
        multilanguage: state.SystemConfig.multilanguage
    }), shallowEqual)

    const { location } = props;
    const pathname = location ? location.pathname : '';


    const prepareSubmenu = (elem: MenuItem) => {
        return <LeftMenuSubmenu
            elem={elem}
            pathname={pathname}
            slug_urls={slug_urls}
            language={language}
            prepareLabelMenu={prepareLabelMenu}
            prepareMenuLink={prepareMenuLink}
            multilanguage={multilanguage}
        />
    }
    const prepareMenuLink = (elem: MenuItem) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, null, url, multilanguage);
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

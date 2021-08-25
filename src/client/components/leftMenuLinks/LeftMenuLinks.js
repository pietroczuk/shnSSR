import React from 'react';
import styles from './leftMenuLinks.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import LeftMenuSubmenu from './leftMenuSubmenu/LeftMenuSubmenu';

const LeftMenuLinks = (props) => {

    const { menu_items, language, slug_urls } = useSelector(state => ({
        menu_items: state.global.menu.side === 'top' ? state.global.menu.top : state.global.menu.side,
        language: state.user.language,
        slug_urls: state.config.urls,
    }))

    const { location } = props;
    const pathname = location !== undefined ? location.pathname : '';


    const prepareSubmenu = (elem) => {
        return <LeftMenuSubmenu
            elem={elem}
            pathname={pathname}
            slug_urls={slug_urls}
            language={language}
            prepareLabelMenu={prepareLabelMenu}
            prepareMenuLink={prepareMenuLink}
        />
    }
    const prepareMenuLink = (elem, clickHandler = null) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, url)
            return (
                <NavLink to={new_url} activeClassName={styles.active} className={styles.side_link_container} onClick={clickHandler}>
                    {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
                </NavLink>
            )
        } else {
            return items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color);
        }
    }
    const prepareLabelMenu = (label, color = null, expand = false, bolder = false) => {
        const customColor = !color ? color : { color: color };
        return <div style={customColor} className={`${styles.side_label} ${expand ? styles.side_link_container : ''} ${bolder ? styles.bolder : ''}`}>{label}</div>
    }

    return <nav className={styles.container}>
        <ul className={styles.side_list}>
            {menu_items && menu_items.map((elem, index) =>
                <li key={index}>
                    {prepareMenuLink(elem)}
                </li>
            )}
        </ul>
    </nav>
}

export default withStyles(styles)(LeftMenuLinks);

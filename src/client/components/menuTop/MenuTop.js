import React from 'react';
import styles from './menuTop.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import SubMenu from './submenu/SubMenu';

const MenuTop = (props) => {
    const { menu_items, slug_urls } = useSelector(state => ({
        menu_items: state.PublicConfig.menu.top,
        slug_urls: state.SystemConfig.urls,
    }))
    const { language } = props;

    const prepareSubmenu = elem => {
        return <SubMenu elem={elem} prepareLabelMenu={prepareLabelMenu} prepareMenuLink={prepareMenuLink} />
    }
    const prepareMenuLink = (elem, clickHandler = null) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, url)
            return <NavLink to={new_url} activeClassName={styles.active} className={styles.link_container} onClick={clickHandler}>
                {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
            </NavLink>
        } else {
            return items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color);
        }
    }
    const prepareLabelMenu = (label, color = null) => {
        const customColor = !color ? color : { color: color };
        return <div className={styles.label} style={customColor}>{label}</div>
    }
    return <nav className={styles.main_menu}>
        <ul className={styles.list}>
            {menu_items && menu_items.map((elem, index) =>
                <li key={index} className={styles.list_li}>
                    {prepareMenuLink(elem)}
                </li>
            )}
        </ul>
    </nav>
}

export default withStyles(styles)(MenuTop);

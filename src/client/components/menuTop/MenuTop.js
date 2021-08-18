import React from 'react';
import styles from './menuTop.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import SubMenu from './submenu/SubMenu';

const MenuTop = (props) => {
    const { menu_items, slug_urls, language, location } = props;
    const pathname = location !== undefined ? location.pathname : '';

    const prepareSubmenu = elem => {
        return <SubMenu elem={elem} prepareLabelMenu={prepareLabelMenu} prepareMenuLink={prepareMenuLink} />
    }
    const prepareMenuLink = (elem, clickHandler = null) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, url)
            const active_link = new_url === pathname ? styles.active : '';
            return <Link to={new_url} className={`${active_link + ' ' + styles.link_container}`} onClick={clickHandler}>
                {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
            </Link>
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
            {menu_items.map((elem, index) =>
                <li key={index} className={styles.list_li}>
                    {prepareMenuLink(elem)}
                </li>
            )}
        </ul>
    </nav>
}

const mapStateToProps = state => ({
    menu_items: state.global.menu.top,
    slug_urls: state.config.urls,
});
export default
    connect(mapStateToProps, {})
        (withStyles(styles)(MenuTop))

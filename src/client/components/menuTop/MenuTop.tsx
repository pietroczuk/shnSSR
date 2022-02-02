import { FC } from 'react';
import styles from './menuTop.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useSelector, shallowEqual } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

import SubMenu from './submenu/SubMenu';
import { RootState } from '../../client';
import { MenuItem } from '../../redux/Models/PublicConfig/Menu/MenuItem/MenuItem.model';

const MenuTop: FC = () => {
    const { menu_items, slug_urls, isMultilanguage, language } = useSelector((state: RootState) => ({
        menu_items: state.PublicConfig.menu ? state.PublicConfig.menu.top : null,
        slug_urls: state.SystemConfig.pageTypePrefixUrls,
        isMultilanguage: state.SystemConfig.isMultilanguage,
        language: state.User.language,
    }), shallowEqual)

    const prepareSubmenu = (menuItem: MenuItem) => {
        return <SubMenu menuItem={menuItem} prepareLabelMenu={prepareLabelMenu} prepareMenuLink={prepareMenuLink} />
    }
    const prepareMenuLink = (elem: MenuItem) => {
        const { type, url, label, items, color } = elem;

        if (url) {
            const new_url = prepUrlFromConfigSlug(language, slug_urls, type, null, url, isMultilanguage);
            return <NavLink to={new_url} activeClassName={styles.active} className={styles.link_container}>
                {items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color)}
            </NavLink>
        } else {
            return items && items.length ? prepareSubmenu(elem) : prepareLabelMenu(label, color);
        }
    }
    const prepareLabelMenu = (label: string, color?: string) => {
        const customColor = !color ? {} : { color: color };
        return <div className={styles.label} style={customColor}>{label}</div>
    }
    return <nav className={styles.main_menu}>
        {/* {console.log('render top menu')} */}
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

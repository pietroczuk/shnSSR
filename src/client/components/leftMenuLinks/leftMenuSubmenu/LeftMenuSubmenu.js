import React, { useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from '../leftMenuLinks.modules.scss';

import { prepUrlFromConfigSlug } from '../../../utils/utilsFrondend';

const LeftMenuSubmenu = props => {
    const { elem, prepareLabelMenu, prepareMenuLink, pathname, language, slug_urls } = props;
    const { items, label, color } = elem;

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const toogleSubmenuHandler = () => {
        setOpenSubmenu(prevstate => !prevstate);
    }
    const openSubmenuHandler = (open) => {
        setOpenSubmenu(open);
    }
    useEffect(() => {
        // console.log('sprawdzam', label);
        const foudmatch = items.some(item => {
            if(item.url && pathname === prepUrlFromConfigSlug(language, slug_urls, item.type, item.url)){
                return openSubmenuHandler(true);
            }
        });
        if(!foudmatch && openSubmenu) {
            openSubmenuHandler(false);
        }
    },[pathname])

    return (
        <div onClick={toogleSubmenuHandler}>
            {prepareLabelMenu(label, color, true, openSubmenu)}
            <div className={`${styles.submenu + ' ' + (openSubmenu ? styles.open_submenu : '')}`}>
                <ul>
                    {                   
                        items.map((it, index) =>
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
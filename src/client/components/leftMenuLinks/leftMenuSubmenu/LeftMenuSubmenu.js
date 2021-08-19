import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from '../leftMenuLinks.modules.scss';

const LeftMenuSubmenu = ({ elem, prepareLabelMenu, prepareMenuLink }) => {

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const openSubmenuHandler = () => {
        setOpenSubmenu(true);
    }
    const closeSubmenuHandler = () => {
        setOpenSubmenu(false);
    }

    const { items, label, color } = elem;
    
    return (
        <div 
            onMouseOver={openSubmenuHandler}
            onMouseLeave={closeSubmenuHandler}
        >
            {prepareLabelMenu(label, color)}
            <div>
                <ul>
                    {
                        items.map((it, index) =>
                            <li key={index}>
                                {prepareMenuLink(it, closeSubmenuHandler)}
                            </li>
                        )
                    }
                </ul>
            </div >
        </div >
    )
}
export default withStyles(styles)(LeftMenuSubmenu);
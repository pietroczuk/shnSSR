import { FC, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from '../menuTop.scss';
import { MenuItem } from '../../../redux/types/publicConfig.types';

interface Props {
    elem : MenuItem;
    prepareLabelMenu: Function;
    prepareMenuLink: Function;
}

const SubMenu: FC<Props> = ({ elem, prepareLabelMenu, prepareMenuLink }) => {

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const openSubmenuHandler = () => {
        setOpenSubmenu(true);
    }
    const closeSubmenuHandler = () => {
        setOpenSubmenu(false);
    }

    const { items, label, color, columns } = elem;
    const percentOffset = 10;
    

    const columnsStyle = columns && columns > 1 ? {
        columns: columns,
        WebkitColumns: columns,
        MozColumns: columns,
        width: (100/(columns+1))*columns - percentOffset + '%'
    } : {};
    const imageStyle = columns && columns > 1 ? {
        width: (100/(columns+1)) + percentOffset + '%'
    }: {}
    const submenuStyle = columns && columns > 1 ? {
        width : (columns+3)*110 + 'px'
    } : {}
    return (
        <div className={`${styles.expand_li + ' ' + styles.link_container}`}
            onMouseOver={openSubmenuHandler}
            onMouseLeave={closeSubmenuHandler}
        >
            {prepareLabelMenu(label, color)}
            <div className={`${styles.submenu + ' ' + (openSubmenu ? styles.open_submenu : '')}`} style={submenuStyle}>
                <ul className={styles.sub_list} style={columnsStyle}>
                    {
                        items && items.map((it, index) =>
                            <li key={index}>
                                {prepareMenuLink(it, closeSubmenuHandler)}
                            </li>
                        )
                    }
                </ul>
                <div className={styles.submenu_link_img} style={imageStyle}></div>
            </div >
        </div >
    )
}
export default withStyles(styles)(SubMenu);
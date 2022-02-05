import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './iconSubmenu.scss';

interface IconSubmenuProps {
    align?: 'left' | 'right',
    parrentWidth?: number
}

const IconSubmenu: React.FC<IconSubmenuProps> = props => {
    const { align, parrentWidth } = props;
    let style = {}
    let alignClass = '';

    if (align === 'left') {
        alignClass = styles.alignLeft;
        style = { 
            left: 0,
        };
    }
    if (align === 'right') {
        alignClass = styles.alignRight;
        if(parrentWidth) {
            style = { 
                left: parrentWidth + 'px',
                '&:before' : {
                    left: '',
                    right: parrentWidth / 2 + 'px'
                }
            };
        }
    }

    return <div className={`${styles.submenu} ${alignClass}`} style={style}>
        {props.children}
    </div>
}
export default withStyles(styles)(IconSubmenu);
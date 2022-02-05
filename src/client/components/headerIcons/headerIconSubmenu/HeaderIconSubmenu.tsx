import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './headerIconSubmenu.scss'

interface HeaderIconSubmenuProps {
    align?: 'left' | 'right',
    parrentWidth?: number,
    title: string
}

const HeaderIconSubmenu: React.FC<HeaderIconSubmenuProps> = props => {
    const { align, parrentWidth, title } = props;
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
        <span className={styles.title}>{title}</span>
        {props.children}
    </div>
}
export default withStyles(styles)(HeaderIconSubmenu);
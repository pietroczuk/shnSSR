import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

import { prepUrlFromConfigSlug } from '../../utils/utilsFrondend';

const InteractiveIcon = (props) => {
    const { 
        white, 
        hoverBg, 
        hoverOpacity, 
        customWidth, 
        customSvgSize, 
        badgeNumber = 0, 
        onMouseEnter, 
        onMouseLeave, 
        special_pages_urls, 
        language, 
        multilanguage 
    } = props;
    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;
    const link_url = special_pages_urls ? prepUrlFromConfigSlug(language, null, null, null, special_pages_urls, multilanguage) : '#';

    return (
        <NavLink to={link_url}
            className={`
            ${styles.icon} 
            ${white ? styles.whiteIcon : ''}
            ${hoverBg ? styles.iconHover : ''}
            ${hoverOpacity ? styles.iconOpacity : ''}
            `}
            style={{
                width: width + 'px'
            }}
            // onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={styles.svgContener}
                style={{
                    maxWidth: svgSize + 'px',
                    maxHeight: svgSize + 'px',
                }}>
                {badgeNumber > 0 && <div className={styles.badge}>{badgeNumber}</div>}
                {props.children}
            </div>
        </NavLink>
    )
}
export default withStyles(styles)(InteractiveIcon);
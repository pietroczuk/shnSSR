import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

import { prepareLink } from '../../utils/utilsFrondend';

const InteractiveIcon = (props) => {
    const { white, hoverBg, hoverOpacity, customWidth, customSvgSize, badgeNumber = 0, onMouseEnter, onMouseLeave, url, slug_urls, language } = props;
    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;
    const icon_url = url ? prepareLink(language, slug_urls, url) : '#';

    return (
        <NavLink to={icon_url}
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
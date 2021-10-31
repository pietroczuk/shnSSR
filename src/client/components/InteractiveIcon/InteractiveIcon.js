import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './interactiveIcon.scss';

const InteractiveIcon = (props) => {
    const { white, hoverBg, hoverOpacity, customWidth, customSvgSize, onClick, onMouseEnter, onMouseLeave } = props;
    const width = customWidth ? customWidth : 50;
    const svgSize = customSvgSize ? customSvgSize : 20;
    return (
        <div className={`
            ${styles.icon} 
            ${white ? styles.whiteIcon : ''}
            ${hoverBg ? styles.iconHover : ''}
            ${hoverOpacity ? styles.iconOpacity : ''}
            `}
            style={{
                width: width + 'px'
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={styles.svgContener}
            style={{
                maxWidth: svgSize + 'px',
                maxHeight: svgSize + 'px',
            }}>
                {props.children}
            </div>
        </div>
    )
}
export default withStyles(styles)(InteractiveIcon);
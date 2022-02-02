import React, { useState, useEffect, CSSProperties } from "react";

import withStyles from "isomorphic-style-loader/withStyles";

import styles from './blackButton.scss';

import { isObjectEmpty } from "../../../../utils/utilsFrondend";

interface BlackButtonProps {
    label: string;
    customBgColor?: string;
    customHoverBgColor?: string;
    color?: string;
    colorHover?: string;
    clickHandler: VoidFunction;
    showHoverUnderline?: boolean
    sizeEm?: number
}

const BlackButton: React.FC<BlackButtonProps> = props => {
    const {
        label,
        customBgColor,
        customHoverBgColor,
        color,
        colorHover,
        clickHandler,
        showHoverUnderline,
        sizeEm
    } = props;

    const [customSyle, setCustomStyle] = useState({});
    const [customHoverStyle, setCustomHoverStyle] = useState({});
    const [showUnderline, setShowUnderLine] = useState(false);

    const onHoverHandler = () => {
        const hoverStyle: CSSProperties = {};
        customHoverBgColor ? hoverStyle.backgroundColor = customHoverBgColor : null;
        colorHover ? hoverStyle.color = colorHover : null;
        !isObjectEmpty(hoverStyle) && setCustomHoverStyle(hoverStyle);
        showHoverUnderline && setShowUnderLine(true);
    }
    const onLeaveHandler = () => {
        setCustomHoverStyle({});
        setShowUnderLine(false);
    }

    useEffect(() => {
        const customStyle: CSSProperties = {};
        customBgColor ? customStyle.backgroundColor = customBgColor : null;
        color ? customStyle.color = color : null;
        sizeEm ? customStyle.fontSize = sizeEm + 'em' : null;
        setCustomStyle(customStyle);
    }, [customBgColor, color, sizeEm])

    const customUnderlineStyle: CSSProperties = {};
    colorHover ? customUnderlineStyle.backgroundColor = colorHover : '#fff';

    return <div className={`${styles.btnContener} ${showUnderline ? styles.showUnderline : ''}`}
        style={isObjectEmpty(customHoverStyle) ? customSyle : customHoverStyle}
        onClick={clickHandler}
        onMouseEnter={onHoverHandler}
        onMouseLeave={onLeaveHandler}
    >
        <span className={styles.text}>
            {label}
            {showHoverUnderline && <div className={styles.underline} style={customUnderlineStyle}></div>}
        </span>
    </div>
}

export default withStyles(styles)(BlackButton);
import { FC, useState, useEffect, CSSProperties } from "react";

import withStyles from "isomorphic-style-loader/withStyles";

import styles from './blackButton.scss';

import { isObjectEmpty } from "../../../../utils/utilsFrondend";

interface BlackButtonProps {
    label: string;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    color?: string;
    hoverColor?: string;
    fontSize?: string;
    uppercase?: boolean;
    fontWeight?: number;
    padding?: string,
    hoverPadding?: string;
    clickHandler: VoidFunction;
    showHoverUnderline?: boolean;
}

const BlackButton: FC<BlackButtonProps> = props => {
    const {
        label,
        backgroundColor,
        hoverBackgroundColor,
        color,
        hoverColor,
        fontSize,
        uppercase,
        fontWeight,
        padding,
        hoverPadding,
        clickHandler,
        showHoverUnderline
    } = props;

    const [customSyle, setCustomStyle] = useState({});
    const [customHoverStyle, setCustomHoverStyle] = useState({});
    const [showUnderline, setShowUnderLine] = useState(false);

    const onHoverHandler = () => {
        const hoverStyle: CSSProperties = { ...customSyle };
        hoverBackgroundColor ? hoverStyle.backgroundColor = hoverBackgroundColor : null;
        hoverColor ? hoverStyle.color = hoverColor : null;
        hoverPadding ? hoverStyle.padding = hoverPadding : "1.5em 0 1.5em 0";
        !isObjectEmpty(hoverStyle) && setCustomHoverStyle(hoverStyle);
        showHoverUnderline && setShowUnderLine(true);
    }
    const onLeaveHandler = () => {
        setCustomHoverStyle({});
        setShowUnderLine(false);
    }

    useEffect(() => {
        const customStyle: CSSProperties = {};
        backgroundColor ? customStyle.backgroundColor = backgroundColor : null;
        color ? customStyle.color = color : null;
        fontSize ? customStyle.fontSize = fontSize : null;
        uppercase ? customStyle.textTransform = 'uppercase' : null;
        fontWeight ? customStyle.fontWeight = fontWeight : 500;
        padding ? customStyle.padding = padding : "1.5em 0 1.5em 0";
        setCustomStyle(customStyle);
    }, [backgroundColor, color, fontSize, uppercase, fontWeight])

    const customUnderlineStyle: CSSProperties = {};
    hoverColor ? customUnderlineStyle.backgroundColor = hoverColor : '#fff';

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
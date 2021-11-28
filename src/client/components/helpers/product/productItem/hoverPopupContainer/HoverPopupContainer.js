import React from "react";
import styles from './hoverPopupContainer.scss';
import withStyles from "isomorphic-style-loader/withStyles";

const HoverPopupContainer = props => {
    const { active, children } = props;
    return <div className={`${styles.container} ${active ? styles.active : ''}`}>{children}</div>
}
export default withStyles(styles)(HoverPopupContainer);
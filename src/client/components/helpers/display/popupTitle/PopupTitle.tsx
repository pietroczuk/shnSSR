import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './popupTitle.scss'

interface Props {
    text: string,
    underline: boolean
}

const PopupTitle: React.FC<Props> = props => {
    const { text, underline } = props;
    return (
        <div className={`${styles.label} ${underline && styles.underline}`}>
            {text}
        </div>
    )
}

export default withStyles(styles)(PopupTitle);
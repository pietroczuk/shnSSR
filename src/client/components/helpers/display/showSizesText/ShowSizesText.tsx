import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showSizesText.scss'

const ShowSizesText: React.FC<{text: string, minitext: string}> = props => {
    const { text, minitext } = props;
    return (
        <span className={styles.label}>
            {text}
            {minitext && <span className={styles.minilabel}>{minitext}</span>}
        </span>
    )
}

export default withStyles(styles)(ShowSizesText);
import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showSizesText.scss'

interface ShowSizesTextProps {
    text: string, 
    minitext: string | null
}

const ShowSizesText: React.FC<ShowSizesTextProps> = props => {
    const { text, minitext } = props;
    return (
        <span className={styles.label}>
            {text}
            {minitext && <span className={styles.minilabel}>{minitext}</span>}
        </span>
    )
}

export default withStyles(styles)(ShowSizesText);
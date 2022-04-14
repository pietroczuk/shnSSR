import React from "react";
import styles from './saleBadge.scss';
import withStyles from "isomorphic-style-loader/withStyles";

interface SaleBadgeProps {
    sale: {
        enable: boolean,
        startSale: number | null,
        stopSale: number | null,
        percent: number | null
    } | null
}

const SaleBadge: React.FC<SaleBadgeProps> = props => {
    const { sale } = props;
    return (
        <div className={styles.badge}>
            -{sale.percent}%
        </div>
    );
}
export default withStyles(styles)(SaleBadge);
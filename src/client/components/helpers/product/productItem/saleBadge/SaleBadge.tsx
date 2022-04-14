import React from "react";
import styles from './saleBadge.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../client";

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
    if (!sale || (sale && !sale.enable)) {
        return <React.Fragment />
    }

    const showBadge = useSelector((state: RootState) => {
        const date = state.User.today.date
        if (date >= sale.startSale) {
            return true;
        }
        return false;
    }
    );

    if (showBadge) {
        return (
            <div className={styles.badge}>
                -{sale.percent}%
            </div>
        );
    }
    return <React.Fragment />

}
export default withStyles(styles)(SaleBadge);
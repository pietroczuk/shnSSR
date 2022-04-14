import React from "react";
import styles from './saleBadge.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../client";
import { checkTrueSale } from "../../../../../utils/utilsFrondend";
import { Sale } from "../../../../../redux/Models/Product/Sale/Sale.model";

interface SaleBadgeProps {
    sale: Sale
}

const SaleBadge: React.FC<SaleBadgeProps> = props => {
    const { sale } = props;

    const showBadge = useSelector((state: RootState) => {
        const now = state.User.today.date
        return checkTrueSale(sale, now)
    });

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
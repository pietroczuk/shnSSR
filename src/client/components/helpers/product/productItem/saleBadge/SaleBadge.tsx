import { FC } from "react";
import styles from './saleBadge.scss';
import withStyles from "isomorphic-style-loader/withStyles";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../../client";
// import { checkTrueSale } from "../../../../../utils/utilsFrondend";
import { Sale } from "../../../../../redux/Models/Product/Sale/Sale.model";

interface SaleBadgeProps {
    sale: Sale,
    cssClass?: string
}

const SaleBadge: FC<SaleBadgeProps> = props => {
    const { sale, cssClass } = props;

    // const showBadge = useSelector((state: RootState) => {
    //     const now = state.User.today.date
    //     return checkTrueSale(sale, now)
    // });

    // if (showBadge) {
    return (
        <div className={`${styles.badge} ${cssClass ? cssClass : ''}`}>
            -{sale.percent}%
        </div>
    );
    // }
    // return <React.Fragment />

}
export default withStyles(styles)(SaleBadge);
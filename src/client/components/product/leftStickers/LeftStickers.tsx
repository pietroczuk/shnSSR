import { FC } from "react";
import styles from './leftStickers.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import BackButton from "./backButton/BackButton";
import SaleBadge from "../../helpers/product/productItem/saleBadge/SaleBadge";
import { Sale } from "../../../redux/Models/Product/Sale/Sale.model";

interface LeftStickersProps {
    sale: Sale,
    showPromo: Boolean,
}

const LeftStickers: FC<LeftStickersProps> = props => {
    const { sale, showPromo } = props;
    return <div className={styles.leftNavigationWithSale}>
        <BackButton />
        {showPromo && <SaleBadge sale={sale} cssClass={styles.saleBadge} />}
    </div>
}

export default withStyles(styles)(LeftStickers);


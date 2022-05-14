import { FC } from "react";
import styles from './priceSaleInfo.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { formatPrice, getPriceByCurrency } from "../../../utils/utilsFrondend";
import { useSelector } from "react-redux";
import { RootState } from "../../../client";

interface PriceSaleInfoProps {
    percent: number;
    saveMoney: {
        [key: string]: number;
    }
}

const PriceSaleInfo: FC<PriceSaleInfoProps> = props => {
    const { percent, saveMoney } = props;
    const { allCurrencies, currency, youSave } = useSelector((state: RootState) => ({
        allCurrencies: state.SystemConfig.allCurrencies,
        currency: state.User.currency,
        youSave: state.PublicConfig.translations.youSave
    }))
    return <div className={styles.contener}>
        -{percent} % | {youSave} {formatPrice(getPriceByCurrency(saveMoney, currency, allCurrencies), currency, allCurrencies)}
    </div>
}
export default withStyles(styles)(PriceSaleInfo);


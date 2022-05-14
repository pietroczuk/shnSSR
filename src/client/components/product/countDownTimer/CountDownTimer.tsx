import {
    FC,
    // useEffect 
} from "react";
import styles from './countDownTimer.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import DigitMainHolder from "./digitMainHolder/DigitMainHolder";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../client";

interface CountDownTimerProps {
    stopSale: number;
    showContainer?: Boolean;
    customOpacity?: number;
    customColor?: string;
}
const CountDownTimer: FC<CountDownTimerProps> = props => {
    const { stopSale, showContainer, customOpacity, customColor } = props;

    return <div className={`${styles.countDownContainer} ${showContainer ? styles.solidBackground : ''}`}>
        <DigitMainHolder stopSale={stopSale} isDays={true} customOpacity={customOpacity} customColor={customColor} />
        <DigitMainHolder stopSale={stopSale} isHours={true} customOpacity={customOpacity} customColor={customColor} />
        <DigitMainHolder stopSale={stopSale} isMinutes={true} customOpacity={customOpacity} customColor={customColor} />
        <DigitMainHolder stopSale={stopSale} isSeconds={true} customOpacity={customOpacity} customColor={customColor} />
    </div>
}

export default withStyles(styles)(CountDownTimer);
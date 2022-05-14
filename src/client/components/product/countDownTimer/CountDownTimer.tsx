import { FC, 
    // useEffect 
} from "react";
import styles from './countDownTimer.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import DigitMainHolder from "./digitMainHolder/DigitMainHolder";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../client";

interface CountDownTimerProps {
    stopSale: number,
}
const CountDownTimer: FC<CountDownTimerProps> = props => {
    const { stopSale } = props;

    // const { days, hours, minutes, seconds, date } = useSelector((state: RootState) => ({
    //     days: state.PublicConfig.translations.days,
    //     hours: state.PublicConfig.translations.hours,
    //     minutes: state.PublicConfig.translations.minutes,
    //     seconds: state.PublicConfig.translations.seconds,
    //     date: state.User.today.date
    // }));

    // useEffect(() => {
    //     const days = 24 * 60 * 60;
    //     const hours = 60 * 60;
    //     const minutes = 60;

    //     let left = Math.floor((stopSale - date) / 1000);
    //     if (left > 0) {
    //         const d = Math.floor(left / days);
    //         left -= d * days;
    //         // Number of hours left
    //         const h = Math.floor(left / hours);
    //         // updateDuo(2, 3, h);
    //         left -= h * hours;
    //         // Number of minutes left
    //         const m = Math.floor(left / minutes);
    //         // updateDuo(4, 5, m);
    //         left -= m * minutes;
    //         // Number of seconds left
    //         const s = left;

    //         console.log(d, h, m, s);
    //     } else {
    //         console.log('left problem', left);
    //     }

    // }, [date])


    return <div className={styles.countDownContainer}>
        <DigitMainHolder stopSale={stopSale} isDays={true}/>
        <DigitMainHolder stopSale={stopSale} isHours={true}/>
        <DigitMainHolder stopSale={stopSale} isMinutes={true}/>
        <DigitMainHolder stopSale={stopSale} isSeconds={true}/>
    </div>
}

export default withStyles(styles)(CountDownTimer);
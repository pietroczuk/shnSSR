import { FC } from "react";
import styles from './digitMainHolder.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../client";

interface DigitMainHolderProps {
    isDays?: Boolean;
    isHours?: Boolean;
    isMinutes?: Boolean;
    isSeconds?: Boolean;
    stopSale: number;
}

const DigitMainHolder: FC<DigitMainHolderProps> = props => {
    const { isDays, isHours, isMinutes, isSeconds, stopSale } = props;

    const label = useSelector((state: RootState) =>
        isDays ? state.PublicConfig.translations.days :
            isHours ? state.PublicConfig.translations.hours :
                isMinutes ? state.PublicConfig.translations.minutes :
                    isSeconds ? state.PublicConfig.translations.seconds : null
    );

    const date = useSelector((state: RootState) => {
        const days = 24 * 60 * 60;
        const hours = 60 * 60;
        const minutes = 60;
        const date = state.User.today.date;
        let left = Math.floor((stopSale - date) / 1000);
        if (left > 0) {
            const d = Math.floor(left / days);
            left -= d * days;
            // Number of hours left
            const h = Math.floor(left / hours);
            // updateDuo(2, 3, h);
            left -= h * hours;
            // Number of minutes left
            const m = Math.floor(left / minutes);
            // updateDuo(4, 5, m);
            left -= m * minutes;
            // Number of seconds left
            const s = left;
            return isDays ? d : isHours ? h : isMinutes ? m : isSeconds ? s : 0;
        } else {
            return 0;
        }
    });

    return <div className={styles.mainHolder}>
        <div className={styles.digits}>
            <div className={styles.digit}>{Math.floor(date / 10) % 10}</div>
            <div className={styles.digit}>{date % 10}</div>
        </div>
        <div className={styles.label}>{label}</div>
    </div>
}

export default withStyles(styles)(DigitMainHolder);
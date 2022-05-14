import { FC } from "react";
import styles from './reviewBar.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import StarFull from "../../../svg/icons/StarFull";

interface ReviewBarProps {
    color: string;
    number: number;
    percent: number;
}

const ReviewBar: FC<ReviewBarProps> = props => {
    const { color, number, percent } = props;
    return <div className={styles.container}>
        <div className={styles.star}><StarFull fill={color} /></div>
        <div className={styles.count}>{number}</div>
        <div className={styles.barCointaner}>
            <div className={styles.bar} style={{ backgroundColor: color, width: percent + '%' }}></div>
        </div>
    </div>
}

export default withStyles(styles)(ReviewBar);
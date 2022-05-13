import { FC } from "react";
import styles from './backButton.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import ArrowDown from "../../../svg/icons/ArrowDown";
import { RootState } from "../../../../client";
import { useSelector } from "react-redux";

const BackButton: FC = () => {
    const isMobile = useSelector((state: RootState) => state.Display.isMobile);
    if (isMobile) {
        return <></>
    }
    return <div className={styles.backButton}>
        <div className={styles.arrow}>
            <ArrowDown />
        </div>
        <div className={styles.textContener}>
            <div className={styles.label}>
                Wróć do
            </div>
            <div className={styles.category}>
                Bestsellery
            </div>
        </div>
    </div>
}

export default withStyles(styles)(BackButton);
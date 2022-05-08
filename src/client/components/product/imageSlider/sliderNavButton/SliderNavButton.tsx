import { FC } from "react";
import styles from './sliderNavButton.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import ArrowDown from '../../../svg/icons/ArrowDown';

interface NavButtonProps {
    onClickHandler: VoidFunction;
    leftDirection: boolean
}

const SliderNavButton: FC<NavButtonProps> = props => {
    const { onClickHandler, leftDirection } = props;
    return <div onClick={onClickHandler} className={`${styles.sliderNavBtn} ${leftDirection ? styles.leftBtn : styles.rightBtn}`}>
            <ArrowDown />
    </div>
}

export default withStyles(styles)(SliderNavButton);
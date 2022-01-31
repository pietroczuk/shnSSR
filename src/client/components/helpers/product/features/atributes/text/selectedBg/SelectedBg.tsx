import { FC } from 'react';
import styles from './selectedbg.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

interface Props {
    width: number,
    position: number
}

const SelectedBg: FC<Props> = ({ width, position }) => {
    const percent_width = width ? 100 / width : 0;
    const divWidth = percent_width ? percent_width + '%' : 'auto';
    let x_pos_left = '0px';
    let x_pos_right = 'auto';
    if (position && width) {
        if (position <= width) {
            x_pos_left = percent_width * position + '%';
        }
    }
    return (
        <div className={styles.selectedBgContener} style={{ width: divWidth, left: x_pos_left, right: x_pos_right }}>
            <div className={styles.selectedBg}></div>
        </div>
    )
}
export default withStyles(styles)(SelectedBg);
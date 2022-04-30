import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './showTitleWithBadge.scss';

import Placeholder from '../../../placeholder/Placeholder';

interface ShowTitleWithBadgeProps {
    title?: string;
    badgeNumber?: number;
    customWidth?: number;
}

const ShowTitleWithBadge: FC<ShowTitleWithBadgeProps> = props => {
    const { title, badgeNumber, customWidth } = props;

    const showTitle = !!title;
    const showBadge = !!badgeNumber && badgeNumber > 0 && showTitle;

    return (
        <h1 className={styles.title}>
            {!showTitle && <Placeholder customWidth={customWidth ? customWidth + '%' : null} />}
            {showTitle && title}
            {showBadge && <span className={styles.titleBagde}>{badgeNumber}</span>}
        </h1>
    )

}

export default withStyles(styles)(ShowTitleWithBadge);
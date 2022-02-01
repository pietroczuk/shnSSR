import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './showTitleWithBadge.scss';

import Placeholder from '../../../placeholder/Placeholder';

interface ShowTitleWithBadgeProps {
    title?: string;
    badgeNumber?: number;
    customWidth?: number;
}

const ShowTitleWithBadge: React.FC<ShowTitleWithBadgeProps> = props => {
    const { title, badgeNumber, customWidth } = props;
    // console.log('title', title);
    if (title === undefined || title === '') {
        return <h1 className={styles.title}><Placeholder customWidth={customWidth !== undefined ? customWidth + '%' : null} /></h1>
    }
    return (
        <h1 className={styles.title}>
            {title}
            {badgeNumber !== undefined && badgeNumber > 0 && <span className={styles.titleBagde}>{badgeNumber}</span>}
        </h1>
    )

}

export default withStyles(styles)(ShowTitleWithBadge);
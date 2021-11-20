import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './showTitleWithBadge.scss';

import Placeholder from '../../../placeholder/Placeholder';

const ShowTitleWithBadge = props => {
    const { title, badgeNumber, customWidth } = props;
    if (!title) {
        return <h1 className={styles.title}><Placeholder customWidth={customWidth ? customWidth + '%' : null} /></h1>
    }
    return (
        <h1 className={styles.title}>
            {title}
            {badgeNumber !== null && <span className={styles.titleBagde}>{badgeNumber}</span>}
        </h1>
    )

}

export default withStyles(styles)(ShowTitleWithBadge);
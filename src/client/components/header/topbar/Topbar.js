import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './topbar.module.scss';

import InteractiveIcon from '../../InteractiveIcon/InteractiveIcon';
import CloseIcon from '../../InteractiveIcon/icons/CloseIcon';

const Topbar = ({ white, closeHandler }) => {
    return (
        <div className={`${styles.topbar} ${white ? styles.whiteTopbar : ''}`} >
            <span>jakies info o topbarze</span>
            <InteractiveIcon
                white={!white}
                onClick={closeHandler}
                hoverOpacity={true}
                customWidth={30}
                customSvgSize={15}>
                <CloseIcon />
            </InteractiveIcon>
        </div>
    )
}

export default withStyles(styles)(Topbar);
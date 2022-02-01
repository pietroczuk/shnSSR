import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './topbar.scss';

import InteractiveIcon from '../../InteractiveIcon/InteractiveIcon';
import CloseIcon from '../../svg/icons/CloseIcon';

interface TopbarProps {
    isWhiteTopbar: boolean;
    closeHandler: VoidFunction
}

const Topbar: FC<TopbarProps> = ({ isWhiteTopbar, closeHandler }) => {
    return (
        <div className={`${styles.topbar} ${isWhiteTopbar ? styles.whiteTopbar : ''}`} >
            <span>jakies info o topbarze</span>
            <InteractiveIcon
                isDarkBackground={!isWhiteTopbar}
                onClick={closeHandler}
                hoverOpacity={true}
                customWidth={30}
                customSvgSize={15}
            >
                <CloseIcon/>
            </InteractiveIcon>
        </div>
    )
}

export default withStyles(styles)(Topbar);
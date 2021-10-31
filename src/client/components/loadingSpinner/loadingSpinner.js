import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './loadingSpinner.scss';

const LoadingSpinner = ({ customContenerWidth, customSpinerSizeEm, customBorderColor, customBorderTopColor, customBorderHeight }) => {
    const contenerWidth = customContenerWidth ? customContenerWidth : '100%';
    const spinerWidth = customSpinerSizeEm ? customSpinerSizeEm : 1;
    const borderColor = customBorderColor ? customBorderColor : 'rgba(0, 0, 0, 0.1)';
    const borderTopColor = customBorderTopColor ? customBorderTopColor : '#fff';
    const borderHeight = customBorderHeight ? customBorderHeight : 2;

    console.log(borderColor);
    return <div className={styles.spinerContener} style={{ width: contenerWidth }}>
        <div className={styles.spinnerColumn}>
            <div
                className={styles.spinner}
                style={{
                    width: spinerWidth + 'em',
                    height: spinerWidth + 'em',
                    // borderColor: borderColor,// + ' !important',
                    border: borderHeight + 'px solid '+ borderColor,
                    borderTopColor: borderTopColor,// + ' !important',
                }}
            ></div>
        </div>
    </div>
}
export default withStyles(styles)(LoadingSpinner);
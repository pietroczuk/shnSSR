import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './loadingSpinner.scss';

interface LoadingSpinnerProps {
    customContenerWidth?: number;
    customContenerHeight?: number;
    customSpinerSizeEm?: number;
    customBorderColor?: string;
    customBorderTopColor?: string;
    customBorderHeight?: number
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ customContenerWidth, customContenerHeight, customSpinerSizeEm, customBorderColor, customBorderTopColor, customBorderHeight }) => {
    const contenerWidth = customContenerWidth !== undefined ? customContenerWidth : '100%';
    const contenerHeight = customContenerHeight !== undefined ? customContenerHeight : 'auto';
    const spinerWidth = customSpinerSizeEm !== undefined ? customSpinerSizeEm : 1;
    const borderColor = customBorderColor !== undefined ? customBorderColor : 'rgba(0, 0, 0, 0.1)';
    const borderTopColor = customBorderTopColor !== undefined ? customBorderTopColor : '#fff';
    const borderHeight = customBorderHeight !== undefined ? customBorderHeight : 2;
    return <div className={styles.spinerContener} style={{ width: contenerWidth, height: contenerHeight }}>
        <div className={styles.spinnerColumn}>
            <div
                className={styles.spinner}
                style={{
                    width: spinerWidth + 'em',
                    height: spinerWidth + 'em',
                    border: borderHeight + 'px solid ' + borderColor,
                    borderTopColor: borderTopColor,
                }}
            ></div>
        </div>
    </div>
}
export default withStyles(styles)(LoadingSpinner);
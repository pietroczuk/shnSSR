import React from 'react';
import styles from './colorCircle.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

interface ColorCircleProps {
    active?: boolean,
    glowColor: string,
    mini?: boolean
}

const ColorCircle: React.FC<ColorCircleProps> = props => {
    const { active, glowColor, mini } = props;
    return (
        <div className={`${styles.contener} ${active || mini ? styles.active : ''} ${mini ? styles.mini : ''}`} >
            <div className={styles.shadow}></div>
            <div className={styles.color}>
                <div className={styles.bg} style={{ backgroundColor: glowColor }}></div>
                <div className={styles.bg} style={{ backgroundColor: glowColor }}></div>
            </div>
        </div>
    )
}

export default withStyles(styles)(ColorCircle);
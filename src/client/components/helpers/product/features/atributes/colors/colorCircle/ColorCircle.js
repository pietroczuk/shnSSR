import React from 'react';
import styles from './colorCircle.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

const ColorCircle = props => {
    const { active, glow_color, mini } = props;
    return (
        <div className={`${styles.contener} ${active || mini ? styles.active : ''} ${mini ? styles.mini : ''}`} >
            <div className={styles.shadow}></div>
            <div className={styles.color}>
                <div className={styles.bg} style={{ backgroundColor: glow_color }}></div>
                <div className={styles.bg} style={{ backgroundColor: glow_color }}></div>
            </div>
        </div>
    )
}

export default withStyles(styles)(ColorCircle);
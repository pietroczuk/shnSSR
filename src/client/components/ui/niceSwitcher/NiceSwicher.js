import React, { useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './niceSwicher.scss';

const NiceSwicher = ({ options, size }) => {
    const width = options ? (100 / options.length) : 0;
    const sizeSwicher = size ? size : 1;
    const [postion, setPosition] = useState(-1);

    useEffect(() => {
        options.some((elem, index) => {
            if (elem.default) {
                setPosition(index);
                return true;
            }
        });
    }, [options]);



    const showOptions = (options) => {
        return options.map((elem, index) => {
            return <div
                key={index}
                className={`${styles.clickElement} ${index === postion ? styles.active : ''}`}
                // onClick={elem.clickHandler}
                onClick={() => setPosition(index)}
                style={{
                    // width: width + '%', 
                    padding: sizeSwicher + 'em ' + sizeSwicher * 2 + 'em'
                }}
            >
                {elem.title}
            </div>
        });
    }

    return options && options.length > 0 ?
        <div className={styles.swicherContener}
            style={{
                fontSize: sizeSwicher + 'em',
                borderRadius: sizeSwicher * 3 + 'em',
                gridTemplateColumns: 'repeat(' + options.length + ', 1fr)'
            }}>
            {showOptions(options)}
            {postion >= 0 && <div className={styles.selectedBgContener}
                style={{
                    left: (width * postion) + '%',
                    width: width + '%',
                    padding: sizeSwicher / 4 + 'em'
                }}>
                <div className={styles.selectedBg} style={{ borderRadius: sizeSwicher * 3 + 'em' }}></div>
            </div>
            }
        </div> : '';
}
export default withStyles(styles)(NiceSwicher);
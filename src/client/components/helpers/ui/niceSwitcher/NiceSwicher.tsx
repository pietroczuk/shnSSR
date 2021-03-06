import { FC, Fragment, useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './niceSwicher.scss';

type OptionObj = {
    title: string
    clickHandler: VoidFunction
    default: boolean
}

interface NiceSwicherProps {
    options: OptionObj[];
    size?: number
}

const NiceSwicher: FC<NiceSwicherProps> = props => {
    const { options, size } = props;
    const width = 100 / options.length;
    const sizeSwicher = size ? size : 1;

    const [postion, setPosition] = useState(-1);

    useEffect(() => {
        options.some((elem, index) => {
            if (elem.default) {
                setPosition(index);
                return true;
            }
            return false;
        });
    }, [options]);

    const clickHandlerOption = (index: number, clickFn: VoidFunction) => {
        clickFn();
        setPosition(index);
    }


    const showOptions = (options: OptionObj[]) => {
        return options.map((elem, index) => {
            return <div
                key={index}
                className={`${styles.clickElement} ${index === postion ? styles.active : ''}`}
                // onClick={elem.clickHandler}
                onClick={() => clickHandlerOption(index, elem.clickHandler)}
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
        </div> : <Fragment />;
}
export default withStyles(styles)(NiceSwicher);
import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './imageSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../client';
import { setProductVisual } from '../../../../redux/actionCreators/display/display.ac';

const ImageSwicher: FC = () => {

    const { showVisual, visualMode, translations } = useSelector((state: RootState) => ({
        showVisual: state.Display.showVisual,
        visualMode: state.SystemConfig.cookiesKeys.displayKeys.visualMode,
        translations: state.PublicConfig.translations
    }), shallowEqual)
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductVisual(visualMode));
    }
    const options = [
        {
            title: translations && translations.showArrangement ? translations.showArrangement : '',
            clickHandler: clickHandlerFunction,
            default: showVisual ? true : false
        },
        {
            title: translations && translations.showArrangement ? translations.hideArrangement : '',
            clickHandler: clickHandlerFunction,
            default: !showVisual ? true : false
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8} /></div>;
}
export default withStyles(styles)(ImageSwicher);
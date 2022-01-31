import { FC } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './imageSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setProductVisual } from '../../../../redux/actions/actionCreators';
import { RootState } from '../../../../client';

const ImageSwicher: FC = () => {

    const { showVisual, visual_mode, translation } = useSelector((state: RootState) => ({
        showVisual: state.Display.showVisual,
        visual_mode: state.SystemConfig.cookies_keys.display.visual_mode,
        translation: state.PublicConfig.translation
    }), shallowEqual)
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductVisual(visual_mode));
    }
    const options = [
        {
            title: translation && translation.show_arrangement ? translation.show_arrangement : '',
            clickHandler: clickHandlerFunction,
            default: showVisual ? true : false
        },
        {
            title: translation && translation.show_arrangement ? translation.hide_arrangement : '',
            clickHandler: clickHandlerFunction,
            default: !showVisual ? true : false
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8} /></div>;
}
export default withStyles(styles)(ImageSwicher);
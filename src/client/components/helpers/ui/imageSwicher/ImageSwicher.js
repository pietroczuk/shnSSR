import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './imageSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setProductVisual } from '../../../../redux/actions/actionCreators';

const ImageSwicher = () => {

    const { showVisual, visual_mode } = useSelector(state => ({
        showVisual: state.Display.showVisual,
        visual_mode: state.SystemConfig.cookies_keys.display.visual_mode
    }), shallowEqual)
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductVisual(visual_mode));
    }
    const options = [
        {
            title: "Pokaż aranżację",
            clickHandler: clickHandlerFunction,
            default: showVisual ? true : false
        },
        {
            title: "Schowaj aranżację",
            clickHandler: clickHandlerFunction,
            default: !showVisual ? true : false
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8} /></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(ImageSwicher);
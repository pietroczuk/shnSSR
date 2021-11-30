import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './randomColorSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setProductRandomColors } from '../../../../redux/actions/actionCreators';

const RandomColorSwicher = () => {

    const { showRandom, random_variant, translation } = useSelector(state => ({
        showRandom: state.Display.showRandom,
        random_variant: state.SystemConfig.cookies_keys.display.random_variant,
        translation: state.PublicConfig.translation
    }), shallowEqual)
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductRandomColors(random_variant));
    }
    const options = [
        {
            title: translation && translation.show_random ? translation.show_random : '',
            clickHandler: clickHandlerFunction,
            default: showRandom ? true : false,
        },
        {
            title: translation && translation.hide_random ? translation.hide_random : '',
            clickHandler: clickHandlerFunction,
            default: !showRandom ? true : false,
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8} /></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(RandomColorSwicher);
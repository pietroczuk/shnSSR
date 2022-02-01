import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './randomColorSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setProductRandomColors } from '../../../../redux/actions/actionCreators';
import { RootState } from '../../../../client';

const RandomColorSwicher: React.FC = () => {

    const { showRandom, randomVariant, translations } = useSelector((state: RootState) => ({
        showRandom: state.Display.showRandom,
        randomVariant: state.SystemConfig.cookiesKeys.displayKeys.randomVariant,
        translations: state.PublicConfig.translations
    }), shallowEqual)
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductRandomColors(randomVariant));
    }
    const options = [
        {
            title: translations && translations.show_random ? translations.show_random : '',
            clickHandler: clickHandlerFunction,
            default: showRandom ? true : false,
        },
        {
            title: translations && translations.hide_random ? translations.hide_random : '',
            clickHandler: clickHandlerFunction,
            default: !showRandom ? true : false,
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8} /></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(RandomColorSwicher);
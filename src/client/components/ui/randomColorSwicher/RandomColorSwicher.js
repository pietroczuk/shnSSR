import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './randomColorSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useDispatch } from 'react-redux';
import { setProductRandomColors } from '../../../redux/actions/actionCreators';

const RandomColorSwicher = ({showRandom, cookieKey}) => {
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductRandomColors(cookieKey));
    }
    const options = [
        {
            title : "Losowy blask i papier",
            clickHandler : clickHandlerFunction,
            default: showRandom ? true : false,
        },
        {
            title : "Twój osobisty wybór",
            clickHandler : clickHandlerFunction,
            default: !showRandom ? true : false,
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8}/></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(RandomColorSwicher);
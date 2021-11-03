import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './randomColorSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useDispatch } from 'react-redux';
import { setProductRandomColors } from '../../../redux/actions/actionCreators';

const RandomColorSwicher = () => {
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductRandomColors());
    }
    const options = [
        {
            title : "Losowy blask i papier",
            clickHandler : clickHandlerFunction
        },
        {
            title : "Twój osobisty wybór",
            clickHandler : clickHandlerFunction,
            default: true
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8}/></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(RandomColorSwicher);
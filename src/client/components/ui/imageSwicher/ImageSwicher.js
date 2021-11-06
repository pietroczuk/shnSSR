import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './imageSwicher.scss';

import NiceSwicher from '../niceSwitcher/NiceSwicher';
import { useDispatch } from 'react-redux';
import { setProductVisual } from '../../../redux/actions/actionCreators';

const ImageSwicher = ({showVisual}) => {
    const dispatch = useDispatch();

    const clickHandlerFunction = () => {
        dispatch(setProductVisual());
    }
    const options = [
        {
            title : "Pokaż aranżację",
            clickHandler : clickHandlerFunction,
            default: showVisual ? true: false
        },
        {
            title : "Schowaj aranżację",
            clickHandler : clickHandlerFunction,
            default: !showVisual ? true: false
        },
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8}/></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(ImageSwicher);
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import NiceSwicher from '../niceSwitcher/NiceSwicher';
import styles from './imageSwicher.scss';

const ImageSwicher = () => {
    const clickHandlerFunction = () => {
        console.log('switch');
    }
    const options = [
        {
            title : "Pokaż aranżację",
            clickHandler : clickHandlerFunction
        },
        {
            title : "Schowaj aranżację",
            clickHandler : clickHandlerFunction,
            default: true
        },
        // {
        //     title : "test",
        //     clickHandler : clickHandlerFunction,
        // }
    ]

    return <div className={styles.barSwicher}><NiceSwicher options={options} size={0.8}/></div>;
    // return <NiceSwicher options={options} size={0.8}/>
}
export default withStyles(styles)(ImageSwicher);
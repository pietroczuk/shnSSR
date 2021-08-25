import React, {useState} from 'react';
import styles from './colors.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setProductCurrVarId } from '../../../../redux/actions/actionCreators';

const Colors = props => {

    const { attrib, active, link, onClickFunction } = props;
    const { glow_color, attrib_title, attrib_tooltip } = attrib;

    const variations = useSelector(state => state.Page.data.variations);
    const dispatch = useDispatch();
    
    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            dispatch(setProductCurrVarId(link, variations));
        }
    }
    
    return (
        <Link to={"?" + link} 
        onClick={clickMe}
        aria-label={attrib_title}
        >
            <div className={`${styles.contener} ${active ? styles.active : ''}`} >
                <div className={styles.shadow}></div>
                <div className={styles.color}>
                    <div className={styles.bg} style={{ backgroundColor: glow_color }}></div>
                    <div className={styles.bg} style={{ backgroundColor: glow_color }}></div>
                </div>
            </div>
        </Link>
    )
}

export default withStyles(styles)(Colors);
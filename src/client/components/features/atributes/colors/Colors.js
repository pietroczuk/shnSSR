import React, {useState} from 'react';
import styles from './colors.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { set_product_curr_var_id } from '../../../../redux/actions/all_actions';

const Colors = props => {

    const { attrib, active, link, onClickFunction } = props;
    const { glow_color, attrib_title, attrib_tooltip } = attrib;

    const variations = useSelector(state => state.page.data.variations);
    const dispatch = useDispatch();
    
    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            dispatch(set_product_curr_var_id(link, variations));
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
import React, {useState} from 'react';
import styles from './colors.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { set_product_curr_var_id } from '../../../../redux/actions/all_actions';

const Colors = props => {

    const { attrib, active, link, onClickFunction } = props;
    const { glow_color, attrib_title, attrib_tooltip } = attrib;

    // from redux
    const { set_product_curr_var_id, variations } = props;
    
    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            set_product_curr_var_id(link, variations);
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
const mapStateToProps = state => ({
    variations: state.page.data.variations
});
export default
    connect(mapStateToProps, { set_product_curr_var_id })
        (withStyles(styles)(Colors))

// export default withStyles(styles)(Colors);
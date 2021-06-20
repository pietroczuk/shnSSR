import React from 'react';
import styles from './text.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { set_product_curr_var_id } from '../../../../redux/actions/all_actions';
// import base64 from 'base-64';
// import { prepareAttribLink } from '../../../../utils/utilsFrondend';

const Text = props => {
    const { attrib, width, feat_id, active, default_variant, link, onClickFunction } = props;
    const { attrib_title, code } = attrib;
    const textWidth = width ? (100 / width) - 2 + '%' : 'auto';
    // let variant_code_url = current_variant ? current_variant : default_variant;
    // variant_code_url = prepareAttribLink(variant_code_url, code, feat_id);

    // const redirectUrl = base64.encode(JSON.stringify(variant_code_url));

    // from redux
    const { set_product_curr_var_id, variations } = props;

    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            set_product_curr_var_id(link, variations);
        }
        // onClickFunction(code, feat_id, default_variant, null, null, null, link );
    }
    return (
        <Link to={"?" + link} onClick={clickMe}
            className={`${styles.contener} ${active ? styles.active : ''}`}
            style={{ width: textWidth }}
        >
            {attrib_title}
        </Link>
    )
}

const mapStateToProps = state => ({
    variations: state.page.product.variations
});
export default
    connect(mapStateToProps, { set_product_curr_var_id })
        (withStyles(styles)(Text))

// export default withStyles(styles)(Text);
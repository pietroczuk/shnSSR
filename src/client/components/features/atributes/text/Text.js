import React from 'react';
import styles from './text.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setProductCurrVarId } from '../../../../redux/actions/actionCreators';
// import base64 from 'base-64';
// import { prepareAttribLink } from '../../../../utils/utilsFrondend';

const Text = props => {
    const { attrib, width, feat_id, active, default_variant, link, onClickFunction } = props;
    const { attrib_title, code } = attrib;
    const textWidth = width ? (100 / width) - 2 + '%' : 'auto';
    // let variant_code_url = current_variant ? current_variant : default_variant;
    // variant_code_url = prepareAttribLink(variant_code_url, code, feat_id);

    // const redirectUrl = base64.encode(JSON.stringify(variant_code_url));

    const variations = useSelector(state => state.page.data.variations);
    const dispatch = useDispatch();

    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            dispatch(setProductCurrVarId(link, variations));
        }
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

export default withStyles(styles)(Text);
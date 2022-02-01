import React from 'react';
import styles from './text.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setProductCurrVarId } from '../../../../../../redux/actions/actionCreators';
import { RootState } from '../../../../../../client';
// import base64 from 'base-64';
// import { prepareAttribLink } from '../../../../utils/utilsFrondend';

interface Props {
    attrib: { [key: string]: string },
    link: string,
    width: number | null,
    active: boolean
    onClickFunction: () => void
}

const Text: React.FC<Props> = props => {
    const { attrib, width, active, link, onClickFunction } = props;
    const { attrib_title } = attrib;
    const textWidth = width ? (100 / width) - 2 + '%' : 'auto';

    const variations = useSelector((state: RootState) => state.Page.data.variations);
    const dispatch = useDispatch();

    const clickMe = () => {
        if (onClickFunction) {
            onClickFunction();
        } else {
            variations && dispatch(setProductCurrVarId(link, variations));
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
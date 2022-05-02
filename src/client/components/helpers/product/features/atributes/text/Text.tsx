import { FC } from 'react';
import styles from './text.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { 
    // Link,
     useLocation } from 'react-router-dom';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../../../client';
import { SingleAtribute } from '../../../../../../redux/Models/PublicConfig/Features/SingleFeature/Atributes/SingleAtribute/SingleAtribute.model';
import { setProductCurrVarId } from '../../../../../../redux/actionCreators/page/page.ac';
import { setGlobalDefaultVariantcode } from '../../../../../../redux/actionCreators/publicConfig/publicConfig.ac';
import DivNavLink from '../../../../../divNavLink/DivNavLink';
// import base64 from 'base-64';
// import { prepareAttribLink } from '../../../../utils/utilsFrondend';

interface TextProps {
    attrib: SingleAtribute,
    link: string,
    width?: number,
    active: boolean
    onClickFunction: Function,
    featureKey: string,
    isGlobalChange: boolean,
}

const Text: FC<TextProps> = props => {
    const { attrib, width, active, link, onClickFunction, featureKey, isGlobalChange } = props;
    const { attribTitle, code, id } = attrib;
    const textWidth = width ? (100 / width) - 2 + '%' : 'auto';

    const variations = useSelector((state: RootState) => state.Page.data.productPage.variations, shallowEqual);
    const dispatch = useDispatch();

    const clickMe = () => {
        const codeObj = {
            code: code,
            atribId: id
        }

        if (onClickFunction) {
            onClickFunction();
        }
        if (isGlobalChange) {
            dispatch(setGlobalDefaultVariantcode(featureKey, codeObj));
        }

        if (variations) {
            variations && dispatch(setProductCurrVarId(link, variations));
        }
    }
    const { pathname } = useLocation();
    const realLink = link ? pathname + "?" + link : '';
    return (
        <DivNavLink to={realLink}
            className={`${styles.contener} ${active ? styles.active : ''}`}
            style={{ width: textWidth }}
            onClick={clickMe}
        >

            {attribTitle}
        </DivNavLink>
        // <Link to={"?" + link} onClick={clickMe}
        //     className={`${styles.contener} ${active ? styles.active : ''}`}
        //     style={{ width: textWidth }}
        // >
        // </Link>
    )
}

export default withStyles(styles)(Text);
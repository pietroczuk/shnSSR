import { FC } from 'react';
import styles from './text.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { SingleAtribute } from '../../../../../../redux/Models/PublicConfig/Features/SingleFeature/Atributes/SingleAtribute/SingleAtribute.model';
import { setGlobalDefaultVariantcode } from '../../../../../../redux/actionCreators/publicConfig/publicConfig.ac';
import DivNavLink from '../../../../../divNavLink/DivNavLink';

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
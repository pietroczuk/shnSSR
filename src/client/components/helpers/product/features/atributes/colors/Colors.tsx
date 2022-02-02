import React from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setGlobalDefaultVariantcode, setProductCurrVarId, setProductRandomColors } from '../../../../../../redux/actions/actionCreators';

import ColorCircle from './colorCircle/ColorCircle';
import DivNavLink from '../../../../../divNavLink/DivNavLink';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './colors.scss'
import { RootState } from '../../../../../../client';
import { SingleAtribute } from '../../../../../../redux/Models/PublicConfig/Features/SingleFeature/Atributes/SingleAtribute/SingleAtribute.model';

interface Props {
    attrib: SingleAtribute,
    active: boolean,
    link: string,
    isGlobalChange: boolean,
    featureKey: string,
    onClickFunction: Function
}

const Colors: React.FC<Props> = props => {

    const { attrib, active, link, isGlobalChange, featureKey, onClickFunction } = props;
    const { glow_color, attrib_title, code, id } = attrib;

    const { variations, randomVariant } = useSelector((state: RootState) => ({
        variations: state.Page.data ? state.Page.data.productPage.variations : null,
        randomVariant: state.SystemConfig.cookiesKeys.displayKeys.randomVariant
    }), shallowEqual);
    const dispatch = useDispatch();

    const clickMe = () => {
        const codeObj = {
            code: code,
            atrib_id: id
        }
        if (onClickFunction) {
            onClickFunction(featureKey, codeObj);
            return;
        }

        dispatch(setGlobalDefaultVariantcode(featureKey, codeObj));
        dispatch(setProductRandomColors(randomVariant, false));
        if (!isGlobalChange && variations) {
            dispatch(setProductCurrVarId(link, variations));
        }
    }

    return (
        <DivNavLink to={"?" + link}
            onClick={clickMe}
            aria-label={attrib_title}
            className={styles.color}
        >
            <ColorCircle active={active} glow_color={glow_color} />
        </DivNavLink>
    )
}

export default withStyles(styles)(Colors);
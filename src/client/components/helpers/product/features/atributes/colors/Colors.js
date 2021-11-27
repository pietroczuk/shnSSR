import React from 'react';
// import { Link } from 'react-router-dom';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { setProductCurrVarId } from '../../../../../../redux/actions/actionCreators';
import { setGlobalDefaultVariantcode, setProductCurrVarId, setProductRandomColors } from '../../../../../../redux/actions/actionCreators';

import ColorCircle from './colorCircle/ColorCircle';
import DivNavLink from '../../../../../DivNavLink/DivNavLink';

const Colors = props => {

    const { attrib, active, link, globalChange, featureKey } = props;
    const { glow_color, attrib_title, attrib_tooltip, code, id } = attrib;

    const { variations, random_variant } = useSelector(state => ({
        variations: state.Page.data ? state.Page.data.variations : null,
        random_variant: state.SystemConfig.cookies_keys.display.random_variant
    }), shallowEqual);
    const dispatch = useDispatch();

    const clickMe = () => {
        if (globalChange) {
            const codeObj = {
                code: code,
                atrib_id: id
            }
            dispatch(setGlobalDefaultVariantcode(featureKey, codeObj));
            dispatch(setProductRandomColors(random_variant, false));
            // console.log('klick', codeObj, attrib);
        } else {
            dispatch(setProductCurrVarId(link, variations));
        }
    }

    return (
        <DivNavLink to={"?" + link}
            onClick={clickMe}
            aria-label={attrib_title}
        >
            <ColorCircle active={active} glow_color={glow_color} />
        </DivNavLink>
    )
}

export default Colors;
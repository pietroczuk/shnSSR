import React from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setGlobalDefaultVariantcode, setProductCurrVarId, setProductRandomColors } from '../../../../../../redux/actions/actionCreators';

import ColorCircle from './colorCircle/ColorCircle';
import DivNavLink from '../../../../../divNavLink/DivNavLink';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './colors.scss'
import { RootState } from '../../../../../../client';

interface Props {
    attrib: { [key: string]: string },
    active: boolean,
    link: string,
    globalChange: boolean,
    featureKey: string,
    onClickFunction: (featureKey: string, codeObj: object) => void
}

const Colors: React.FC<Props> = props => {

    const { attrib, active, link, globalChange, featureKey, onClickFunction } = props;
    const { glow_color, attrib_title, code, id } = attrib;

    const { variations, random_variant } = useSelector((state: RootState) => ({
        variations: state.Page.data ? state.Page.data.variations : null,
        random_variant: state.SystemConfig.cookies_keys.display.random_variant
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
        dispatch(setProductRandomColors(random_variant, false));
        if (!globalChange && variations) {
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
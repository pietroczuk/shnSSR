import { FC } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import ColorCircle from './colorCircle/ColorCircle';
import DivNavLink from '../../../../../divNavLink/DivNavLink';

import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './colors.scss'
import { RootState } from '../../../../../../client';
import { SingleAtribute } from '../../../../../../redux/Models/PublicConfig/Features/SingleFeature/Atributes/SingleAtribute/SingleAtribute.model';
import { setGlobalDefaultVariantcode } from '../../../../../../redux/actionCreators/publicConfig/publicConfig.ac';
import { setProductRandomColors } from '../../../../../../redux/actionCreators/display/display.ac';
import { useLocation } from 'react-router-dom';
import AssitiveText from '../../../../display/assitiveText/AssitiveText';

interface ColorsProps {
    attrib: SingleAtribute,
    active: boolean,
    link: string,
    isGlobalChange: boolean,
    featureKey: string,
    onClickFunction: Function
}

const Colors: FC<ColorsProps> = props => {

    const { attrib, active, link, isGlobalChange, featureKey, onClickFunction } = props;
    const { glowColor, attribTitle, code, id } = attrib;

    const { randomVariant, showRandom } = useSelector((state: RootState) => ({
        randomVariant: state.SystemConfig.cookiesKeys.displayKeys.randomVariant,
        showRandom: state.Display.showRandom
    }), shallowEqual);
    const dispatch = useDispatch();

    const clickMe = () => {
        const codeObj = {
            code: code,
            atribId: id
        }
        if (onClickFunction) {
            onClickFunction(featureKey, codeObj);
            return;
        }

        if (isGlobalChange) {
            dispatch(setGlobalDefaultVariantcode(featureKey, codeObj));
        }
        if (showRandom) {
            dispatch(setProductRandomColors(randomVariant, false));
        }
    }

    const { pathname } = useLocation();
    const realLink = link ? pathname + "?" + link : '';

    return (
        <DivNavLink to={realLink}
            onClick={clickMe}
            aria-label={attribTitle}
            className={styles.color}
        >
            <ColorCircle active={active} glowColor={glowColor} />
            <AssitiveText>{attribTitle}</AssitiveText>
        </DivNavLink>
    )
}

export default withStyles(styles)(Colors);
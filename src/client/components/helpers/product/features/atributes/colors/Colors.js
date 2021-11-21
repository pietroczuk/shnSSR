import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// import { setProductCurrVarId } from '../../../../../../redux/actions/actionCreators';
import { setProductCurrVarId } from '../../../../../../redux/actions/actionCreators';

import ColorCircle from './colorCircle/ColorCircle';

const Colors = props => {

    const { attrib, active, link, onClickFunction } = props;
    const { glow_color, attrib_title, attrib_tooltip } = attrib;

    const variations = useSelector(state => {
        return state.Page.data ? state.Page.data.variations : null;
    });
    const dispatch = useDispatch();
    
    const clickMe = () => {
        if(onClickFunction) {
            onClickFunction();
        }else{
            dispatch(setProductCurrVarId(link, variations));
        }
    }
    
    return (
        <Link to={"?" + link} 
        onClick={clickMe}
        aria-label={attrib_title}
        >
            <ColorCircle active={active} glow_color={glow_color} />
        </Link>
    )
}

export default Colors;
import React from 'react';
import { NavLink } from 'react-router-dom';

const DivNavLink = props => {
    const { to, className, style, onMouseEnter, onMouseLeave, onClick } = props;
    if (props.to && props.to !== '?') {
        return <NavLink
            to={to}
            className={className}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {props.children}
        </NavLink>
    }
    return <div
        // to={props.to}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    >
        {props.children}
    </div>
}

export default DivNavLink;
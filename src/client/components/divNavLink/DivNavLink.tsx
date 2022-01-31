import React from 'react';
import { NavLink } from 'react-router-dom';

interface DivNavLinkProps {
    to: string | null,
    className?: string,
    style?: React.CSSProperties,
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
}

const DivNavLink: React.FC<DivNavLinkProps> = props => {
    const { to, className, style, onMouseEnter, onMouseLeave, onClick } = props;
    if (to && to !== '?') {
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
import { FC, MouseEvent, CSSProperties, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface DivNavLinkProps {
    to?: string,
    className?: string,
    style?: CSSProperties,
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onMouseLeave?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>,
}

const DivNavLink: FC<DivNavLinkProps> = props => {
    const { to, className, style,
        onMouseEnter,
        onMouseLeave,
        onClick
    } = props;
    const { pathname, search } = useLocation();
    const realLocation = pathname + search;
    const linkEnable = to && to !== '?' ? true : false;

    const onClickHandler = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
        if (linkEnable && realLocation === to) {
            e.preventDefault();
            console.log('no redirect')
        }
        console.log(realLocation, to);
        onClick && onClick(e);
    }

    if (linkEnable) {
        return <NavLink
            to={to}
            className={className}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClickHandler}
        // replace={true}
        // reloadDocument={false}
        >
            {props.children}
        </NavLink>
    }
    return <div
        className={className}
        style={style}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        onClick={onClickHandler}
    >
        {props.children}
    </div>
}

export default DivNavLink;
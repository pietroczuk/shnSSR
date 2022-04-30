import withStyles from "isomorphic-style-loader/withStyles";
import { FC, MouseEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from '../leftMenuLinks.scss';

interface LeftMenuSingleLinkProps {
    new_url: string
}
const LeftMenuSingleLink: FC<LeftMenuSingleLinkProps> = (props) => {
    const { new_url } = props;

    const { pathname, search } = useLocation();
    const realLocation = pathname + search;

    const onClickHandler = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
        if (realLocation === new_url) {
            e.preventDefault();
            console.log('no redirect');
        }
    }

    return <NavLink to={new_url}
        activeClassName={styles.active}
        className={styles.side_link_container}
        onClick={onClickHandler}
    >
        {props.children}
    </NavLink>
}

export default withStyles(styles)(LeftMenuSingleLink);
import { FC, Fragment, useEffect } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { RootState } from "../../client";
import { userActions } from "../../redux/slices/userSlice/userSlice";

interface TimerProps {
    showMe?: boolean
}

const Timer: FC<TimerProps> = props => {
    const { showMe } = props;
    const date = useSelector((state: RootState) => state.User.today.date);
    const dispatch = useDispatch();
    useEffect(() => {
        /** Increase date */
        const timerID = setInterval(
            () => dispatch(userActions.addSecontToTimer()),
            1000);
        return () => {
            clearInterval(timerID);
        }
    }, [])
    const normal_date = new Date(date*1000).toLocaleString("pl-PL", { timeZone: 'Europe/Warsaw' })
    if (showMe) {
        return <Fragment>
            {date} {normal_date}
        </Fragment>
    } else {
        return <Fragment />
    }
}
export default Timer;
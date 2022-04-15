import React, { useEffect } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { RootState } from "../../client";
import { userActions } from "../../redux/slices/userSlice/userSlice";

const Timer: React.FC = () => {
    const date = useSelector((state: RootState) => state.User.today.date);
    const showMe = false;
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
    const normal_date = new Date(date).toLocaleString("pl-PL", { timeZone: 'Europe/Warsaw' })
    if (showMe) {
        return <React.Fragment>
            {date} {normal_date}
        </React.Fragment>
    } else {
        return <React.Fragment />
    }
}
export default Timer;
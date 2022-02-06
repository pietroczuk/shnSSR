import React, { useEffect } from "react";
import { useDispatch, 
    // useSelector 
} from "react-redux";
// import { RootState } from "../../client";
import { userActions } from "../../redux/slices/userSlice/userSlice";

const Timer: React.FC = () => {
    // const date = useSelector((state:RootState) => state.User.today.date);
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
    // return <React.Fragment>{date}</React.Fragment>
    return <React.Fragment/>
}
export default Timer;
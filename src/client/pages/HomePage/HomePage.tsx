import { FC, Fragment, 
    useEffect 
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { RootState } from '../../client';

const HomePage: FC = () => {
    const { ssr } = useSelector((state: RootState) => ({
        ssr: state.PublicConfig.ssr,
    }), shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])
    return (
        <Fragment>
            <div>home component</div>
            <button onClick={() => { console.log('cklik me') }}>kliknij</button>
            <Link to='/gowno'>gowno</Link><br />
            <Link to='/pl/about'>about</Link><br />
            <Link to='/fr/about'>about2</Link><br />
            <Link to='/de/about2'>about3</Link><br />
            <Link to='/pl/s/regulamin-sklepu'>regulamin</Link><br />
            <Link to='/pl/p/plakat-when-something-is-important-enought-elon-musk?5c7f93ea80acee0ad6dffa48'>produkt</Link>

        </Fragment>
    )
};

export default HomePage;
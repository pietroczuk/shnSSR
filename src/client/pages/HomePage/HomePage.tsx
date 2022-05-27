import { FC, Fragment, 
    useEffect 
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { RootState } from '../../client';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { pageTypes } from '../../utils/utilsFrondend';

const HomePage: FC = () => {
    const pageType = pageTypes.homePage;

    const { ssr, homepageMultilanguageUrls } = useSelector((state: RootState) => ({
        ssr: state.PublicConfig.ssr,
        homepageMultilanguageUrls: state.SystemConfig.specialPagesUrlsArray[pageType],
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        const homePageObj = {
            info: {
                url: homepageMultilanguageUrls,
                type: pageTypes.specialPage
            }
        }
        !ssr && dispatch(pageActions.setPageData({ data: homePageObj }));
        return () => {
            dispatch(pageActions.clearPageData());
        }
    }, [ssr]);


    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])
    return (
        <Fragment>
            <div>home component</div>
            <button onClick={() => { console.log('cklik me') }}>kliknij</button>
            <Link to='/'>glowna etc</Link><br />
            <Link to='/pl/about'>about</Link><br />
            <Link to='/fr/about'>about2</Link><br />
            <Link to='/de/about2'>about3</Link><br />
            <Link to='/pl/s/regulamin-sklepu'>regulamin</Link><br />
            <Link to='/pl/p/plakat-when-something-is-important-enought-elon-musk?5c7f93ea80acee0ad6dffa48'>produkt</Link>

        </Fragment>
    )
};

export default HomePage;
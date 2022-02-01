import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import { RootState } from '../../client';

const HomePage: React.FC = () => {
    const { ssr } = useSelector((state: RootState) => ({
        ssr: state.PublicConfig.ssr,
    }), shallowEqual);
    
    const dispatch = useDispatch();
    useEffect(() => {
        // We need disable ssr for special pages
        // because we dont get any data from Api
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])
    // const SeoHead = () => {
    //     return (
    //         <Helmet>
    //             <title>{`${config.length} Home page`}</title>
    //             <meta property="og:title" content="My home page" />
    //         </Helmet>
    //     )
    // }
    return (
        <React.Fragment>
            {/* { SeoHead() } */}
            <div>home component</div>
            <button onClick={() => { console.log('cklik me') }}>kliknij</button>
            <Link to='/gowno'>gowno</Link><br />
            <Link to='/pl/about'>about</Link><br />
            <Link to='/fr/about'>about2</Link><br />
            <Link to='/de/about2'>about3</Link><br />
            <Link to='/pl/s/regulamin-sklepu'>regulamin</Link><br />
            <Link to='/pl/p/plakat-when-something-is-important-enought-elon-musk?5c7f93ea80acee0ad6dffa48'>produkt</Link>

        </React.Fragment>
    )
};

export default HomePage;
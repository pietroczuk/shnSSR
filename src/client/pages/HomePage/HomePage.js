import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { get_global_config } from '../redux/actions/all_actions';
import { Helmet } from 'react-helmet';


import { Link } from 'react-router-dom';

// import Colors from '../../components/atributes/colors/Colors';

const HomePage = props => {
    const { config } = useSelector(state => state.SystemConfig);
    useEffect(() => {
        if (!config) {
            // props.get_global_config();
        }
    }, []);
    const SeoHead = () => {
        return (
            <Helmet>
                <title>{`${config.length} Home page`}</title>
                <meta property="og:title" content="My home page" />
            </Helmet>
        )
    }
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
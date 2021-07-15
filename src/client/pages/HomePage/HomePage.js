import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { get_global_config } from '../redux/actions/all_actions';
import { Helmet } from 'react-helmet';


import { Link } from 'react-router-dom';

// import Colors from '../../components/atributes/colors/Colors';

const HomePage = props => {
    useEffect(() => {
        if (!props.config) {
            // props.get_global_config();
        }
    }, []);
    const SeoHead = () => {
        return (
            <Helmet>
                <title>{`${props.config.length} Home page`}</title>
                <meta property="og:title" content="My home page" />
            </Helmet>
        )
    }
    return (
        <React.Fragment>
            {/* { SeoHead() } */}
            <div>home component</div>
            {
                // props.config.map((elem, index) => {
                //     // console.log(elem.title[0].pl);
                //     return <li key={index}>aa</li>
                // })
            }
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
const mapStateToProps = state => ({
    config: state.config
});

// const loadDataOnInit = server_store => {
//     const my_promise = server_store.dispatch(get_global_config());
//     return my_promise;
// }

// export default {
//     component: HomePage
//         // connect(mapStateToProps, { get_global_config })(HomePage)
// };

export default {
    // loadDataOnInit: loadDataOnInit,
    component:
        connect(mapStateToProps, {})(HomePage)
};


// export default {
//     loadDataOnInit: loadDataOnInit,
//     component:
//         connect(mapStateToProps, { get_global_config })(HomePage)
// };
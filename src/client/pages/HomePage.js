import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get_global_feat } from '../redux/actions/all_actions';
import { Helmet } from 'react-helmet';


const HomePage = props => {
    useEffect(() => {
        if (!props.feat) {
            props.get_global_feat();
        }
    }, []);
    const SeoHead = () => {
        return(
            <Helmet>
                <title>{`${props.feat.length} Home page`}</title>
                <meta property="og:title" content="My home page" />
            </Helmet>
        )
    }
    return (
        <div>
            { SeoHead() }
            <div>home component</div>
            {
                props.feat.map((elem, index) => {
                    // console.log(elem.title[0].pl);
                    return <li key={index}>{elem.title[0].pl}</li>
                })
            }
            <button onClick={() => { console.log('cklik me') }}>kliknij</button>
        </div>
    )
};
const mapStateToProps = state => ({
    feat: state.features
});

const loadDataOnInit = server_store => {
    const my_promise = server_store.dispatch(get_global_feat());
    return my_promise;
}

export default {
    loadDataOnInit: loadDataOnInit,
    component:
        connect(mapStateToProps, { get_global_feat })(HomePage)
};
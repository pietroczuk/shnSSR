import React from 'react';
import { connect } from 'react-redux';

let pathToExport = '';

const isBrowser = () => typeof window !== "undefined"

// if(isBrowser()) {
//     const paths = window.__INITIAL_STATE__;
//     pathToExport = paths.config.language[0].code;
//     // console.log(paths.config.language[0].code);
// }

// console.log(store.getState());

const StaticPage = props => {
    // pathToExport = '/' + props.language[0].code;
    // console.log(pathToExport);
    return (
        <div>siemka</div>
    )
}
const mapStateToProps = state => ({
    language: state.config.language
});

export default {
    component:
        connect(mapStateToProps, {})(StaticPage),
    path: '/' + pathToExport
}
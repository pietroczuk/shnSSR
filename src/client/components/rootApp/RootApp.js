import React from 'react';
import { renderRoutes } from 'react-router-config';

const RootApp = ({ route }) => {
    return (
        <div id="aa">
            {renderRoutes(route.routes)}
        </div>
    );
};

export default {
    component: RootApp
}
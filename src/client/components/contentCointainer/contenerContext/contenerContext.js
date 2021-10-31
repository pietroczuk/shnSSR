import React, { useState } from 'react';

const ContenerContext = React.createContext({ mainContentRef: null, setMainContentRef: () => { } });
export default ContenerContext;

export const ContenerContextProvider = (props) => {
    const [mainRef, setMainRef] = useState(null);
    const setMainRefHandler = reference => {
        setMainRef(reference);
    }
    const contextValue = {
        mainContentRef: mainRef, 
        setMainContentRef: setMainRefHandler
    }
    return <ContenerContext.Provider value={contextValue}>{props.children}</ContenerContext.Provider>
}
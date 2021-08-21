import React, { useState } from 'react';

const ContenerContext = React.createContext({ mainContentRef: null, setMainContentRef: () => { } });
export default ContenerContext;

export const ContenerContextProvider = (props) => {
    const [mainRef, setMainRef] = useState(null);
    const setMainRefHandler = reference => {
        setMainRef(reference);
    }
    return <ContenerContext.Provider value={{mainContentRef: mainRef, setMainContentRef: setMainRefHandler}}>{props.children}</ContenerContext.Provider>
}
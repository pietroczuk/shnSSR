import { FC, useState, RefObject, createContext } from 'react';

type RefState = RefObject<HTMLElement> | null;

const ContenerContext = createContext<{
    mainContentRef : RefState,
    setMainContentRef : (reference: RefState) => void
}>(
    {
        mainContentRef: null,
        setMainContentRef: () => {}
    }
);
export default ContenerContext;

export const ContenerContextProvider: FC = (props) => {
    const [mainRef, setMainRef] = useState<RefState>(null);
    const setMainRefHandler = (reference : RefState) => {
        setMainRef(reference);
    }
    const contextValue = {
        mainContentRef: mainRef,
        setMainContentRef: setMainRefHandler
    }
    return <ContenerContext.Provider value={contextValue}>{props.children}</ContenerContext.Provider>
}
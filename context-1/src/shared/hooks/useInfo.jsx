import { useContext } from 'react';

function useInfo(){
    const MyContext = createContext();
    return useContext(MyContext);
}
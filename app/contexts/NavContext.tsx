'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { restartRFID } from "../lib/api/RFIDapi";
// สร้าง Context
interface NavContextType {
    navname:string;
    setNavname: (name:string) => void;
    navmode:boolean;
    setNavmode: (mode:boolean) => void;
    Restart: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const useNav = () => {
    const context = useContext(NavContext)
    if(!context){
        throw new Error('useNav must be used within a NavProvider')
    }
    return context;
}

// สร้าง Provider
interface NavProviderProps{
    children: ReactNode
}

export const NavProvider: React.FC<NavProviderProps> = ({children}) => {
    const [navname,setNavname] = useState<string>('Self Checkout')
    const [navmode,setNavmode] = useState<boolean>(true)

    const Restart = () => {
        restartRFID()
    }

    return(
        <NavContext.Provider value={{navname, setNavname,navmode,setNavmode,Restart}} >
            {children}
        </NavContext.Provider>
    )
}
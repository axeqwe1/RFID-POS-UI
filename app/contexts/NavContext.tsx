'use client'

import { createContext, ReactNode, useContext, useState } from "react";
// สร้าง Context
interface NavContextType {
    navname:string;
    setNavname: (name:string) => void;
    navmode:boolean;
    setNavmode: (mode:boolean) => void;
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

    return(
        <NavContext.Provider value={{navname, setNavname,navmode,setNavmode}} >
            {children}
        </NavContext.Provider>
    )
}
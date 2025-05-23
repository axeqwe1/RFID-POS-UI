'use client'

import { createContext, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";
import { ProductinCart } from "../types/ProductInCart";
// สร้าง Context
interface SignalRContext {
    data:any[];
    setData: (data:SetStateAction<any[]>) => void;
    resetData : () => void;
}

const SignalRContext = createContext<SignalRContext | undefined>(undefined);

export const useSignalRContext = () => {
    const context = useContext(SignalRContext)
    if(!context){
        throw new Error('useOrder must be used within a NavProvider')
    }
    return context;
}

// สร้าง Provider
interface SignalRProviderProps{
    children: ReactNode
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({children}) => {
    const [data,setData] = useState<any[]>([])
    
    const resetData = () => {
        setData([])
    }
    return(
        <SignalRContext.Provider value={{data, setData,resetData}} >
            {children}
        </SignalRContext.Provider>
    )
}
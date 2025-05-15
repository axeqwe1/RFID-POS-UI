'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { restartRFID, stopRFID } from "../lib/api/RFIDapi";
import { ProductinCart } from "../types/ProductInCart";
// สร้าง Context
interface OrderDetailsContext {
    products:Array<ProductinCart>;
    setProducts: (products:Array<ProductinCart>) => void;
    AmountTotal:number;
    setAmountTotal: (Number:number) => void;
    TotalItem:number;
    setTotalItem: (Number:number) => void;
}

const OrderContext = createContext<OrderDetailsContext | undefined>(undefined);

export const useOrder = () => {
    const context = useContext(OrderContext)
    if(!context){
        throw new Error('useOrder must be used within a NavProvider')
    }
    return context;
}

// สร้าง Provider
interface OrderProviderProps{
    children: ReactNode
}

export const OrderProvider: React.FC<OrderProviderProps> = ({children}) => {
    const [products,setProducts] = useState<Array<ProductinCart>>([])
    const [AmountTotal,setAmountTotal] = useState<number>(0)
    const [TotalItem, setTotalItem] = useState<number>(0)
    
    return(
        <OrderContext.Provider value={{products, setProducts,AmountTotal,setAmountTotal,TotalItem,setTotalItem}} >
            {children}
        </OrderContext.Provider>
    )
}
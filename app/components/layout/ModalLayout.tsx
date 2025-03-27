import { AlertProvider } from "@/app/contexts/AlertContext"
import { CashierCalculatorProvider } from "@/app/contexts/CashierCalculatorContext"
import { ReactNode } from "react"


interface ModalLayoutProps {
    children:ReactNode
}

export const ModalLayout : React.FC<ModalLayoutProps> = ({children} )  =>{
    return (
        <AlertProvider>
            <CashierCalculatorProvider>
                {children}
            </CashierCalculatorProvider>
        </AlertProvider>
    )
}
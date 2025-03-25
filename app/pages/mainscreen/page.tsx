"use client"

import { ReactNode, useState } from "react";

interface MainscreenProps {
    children: ReactNode
}

 const Mainscreen:React.FC<MainscreenProps> = ({children}) => {
    return (
        <div className="max-w-[1400px] mx-auto h-full">
            {children}
        </div>
    )
}

export default Mainscreen
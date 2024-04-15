import { createContext, useState } from "react";

export const UserContext = createContext({
    userProgress: '', // cart, checkout
    showCart: () => {},
    showCheckout: () => {}
});

export default function UserContextProvider({children}) {

    const userCntxValue = {
        
    }

    return <UserContext.Provider>
        {children}
    </UserContext.Provider>
}
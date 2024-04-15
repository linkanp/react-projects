
import { createContext, useReducer } from "react";


export const CartContext =  createContext({
    items: [],
    onAddCartItem: () => {},
    onUpdateCartItem: () => {},
    clearCart: () => {}
});


function cartReducer(state, action) {
    // console.log(action);
    if (action.type === 'add-item') {
        const updatedItems = [...state.items];
        console.log(updatedItems);
        // if the new item exist in cart
        const existingCartItemIndex = updatedItems.findIndex((item) => item.id === action.payload.id);
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else { // else add as new item
            updatedItems.push({
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: 1,
            });
        }
        return {
            ...state,
            items: updatedItems
        }
    }
    if (action.type === 'update-cart-item') {
        // console.log('xxxx');
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.meal.id);
        const updatedItem = {
            ...updatedItems[updatedItemIndex]
        }
        updatedItem.quantity += action.payload.amount;
        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        }

    }
    if (action.type === 'clear-cart') {
        return {
            ...state,
            items: []
        }
    }
   
}

export default function CartContextProvider({children}) {
    const [cartState, cartReducerDispatch] = useReducer(
        cartReducer,
        {
            items: []
        }
    );

    function handleAddCartItem(meal) {
        cartReducerDispatch({
            type: 'add-item',
            payload: meal
        });
    }
    function handleCartItemUpdate(meal, amount) {
        cartReducerDispatch({
            type: 'update-cart-item',
            payload: {
                meal: meal,
                amount: amount
            }
        });
    }
    function clearCart(){
        cartReducerDispatch({type: 'clear-cart'});
    }
    const cartCntxValue = {
        items: cartState.items,
        onAddCartItem: handleAddCartItem,
        onUpdateCartItem: handleCartItemUpdate,
        clearCart
    }
    return <CartContext.Provider value={cartCntxValue}>
        {children}
    </CartContext.Provider>
}
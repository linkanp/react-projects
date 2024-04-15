import { useContext } from "react";
import { CartContext } from '../store/cart-context';

export default function Cart({showCheckoutModal, closeModal}){
    const {items, onUpdateCartItem} = useContext(CartContext);
    const totalPrice = items.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity * currentItem.price,
        0
    );
    return <>
        <div>
            {items.length === 0 && <h4>No items in your cart!</h4>}
            {items.length > 0 && <h4>{items.length} item(s) in your cart!</h4>}
            {items.length > 0 && (
                <ul>
                    {items.map((meal) => {
                        return (
                            <li className="cart-item" key={meal.id}>
                                <p>
                                    {meal.name} - {meal.quantity}x{meal.price}
                                </p>
                                <p className="cart-item-actions">
                                    <button onClick={() => onUpdateCartItem(meal, -1)}>-</button>
                                    <span>{meal.quantity}</span>
                                    <button onClick={() => onUpdateCartItem(meal, +1)}>+</button>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            )}
            {items.length > 0 && 
            <p className="cart-total">
                <strong>{totalPrice}</strong>
            </p>
            }
            <p className="modal-actions">
                <button onClick={() => closeModal('cart')} className="text-button">Close</button>
                {items.length > 0 && <button className="button" onClick={showCheckoutModal}>Checkout</button>}
            </p>
        </div>
        
    </>
}
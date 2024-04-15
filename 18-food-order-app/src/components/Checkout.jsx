import { useContext } from "react";
import { CartContext } from '../store/cart-context';
import Input from "./Input";
import useHTTP from '../hooks/useHTTP.jsx';
import Error from './Error.jsx';
import Modal from './Modal';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}
export default function Checkout({label, id, closeModal}) {
    const {items, onUpdateCartItem, clearCart} = useContext(CartContext);

    const {isLoading, data, error, sendRequest, resetData} = useHTTP('http://localhost:3000/orders', requestConfig);

    const totalPrice = items.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity * currentItem.price,
        0
    );

    function handleCheckoutSubmit(event) {
        console.log('sss');
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(JSON.stringify({
            order: {
                items: items,
                customer: customerData
            },
        }));
    }

    let actions = (
        <>
        <button type="button" className="text-button" onClick={() => closeModal('checkout')}>Close</button>
        <button className="button">Submit</button>
        </>
    );
    if (isLoading) {
        actions = <span>Sending data...</span>;
    }
    function orderFinish(){
        clearCart();
        resetData();
    }
    if (data && !error) {
        closeModal('checkout');
        closeModal('cart');
        return <Modal id="success-modal" open={true}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p className="modal-actions">
                <form method="dialog">
                <button onClick={orderFinish} className="button">Ok</button>
                </form>
            </p>
        </Modal>
    }

    return <form onSubmit={handleCheckoutSubmit}>
            <h2>Checkout</h2>
            <p>Total amount: {totalPrice}</p>
            <Input label='Full Name' id='name' type='text' required />
            <Input label='E-Mail Address' id='email' type="email" required />
            <Input label='Street' id='street' type='text' required />
            <div className="control-row">
                <Input label='Postal Code' id='postal-code' type='text' required />
                <Input label='City' id='city' type='text' required />
            </div>
            {error && <Error title="Failed to send data" message={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
}
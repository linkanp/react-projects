import { useContext } from 'react';
import foodLogo from '../assets/logo.jpg';
import Modal from './Modal';
import { useRef } from 'react';
import { CartContext } from '../store/cart-context';
import Cart from './Cart';
import Checkout from './Checkout';

export default function Header() {
    const cartModal = useRef();
    const checkOutModal = useRef();
    const {items} = useContext(CartContext);

    function handleShowModal(){
        cartModal.current.open();
    }
    function closeModal(modal_name){
        if (modal_name === 'checkout') {
            checkOutModal.current.close();
        }
        if (modal_name === 'cart') {
            cartModal.current.close();
        }
    }
    function handleShowCheckoutModal(){
        checkOutModal.current.open();
    }
    return <>
        <Modal id='cart-modal' ref={cartModal}>
            <Cart closeModal={closeModal} showCheckoutModal={handleShowCheckoutModal}/>
        </Modal>
        <Modal id='checkout-modal' ref={checkOutModal}>
            <Checkout closeModal={closeModal} />
        </Modal>
        <header id="main-header" className="main-header">
            <div id="title">
                <img src={foodLogo} alt="Food Order" />
                <h1>Reactfood</h1>
            </div>
            <p>
                <button className='text-button' onClick={handleShowModal}>Cart ({items.length})</button>
            </p>
      </header>
    </>
}
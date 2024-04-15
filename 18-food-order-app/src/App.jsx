import { useContext } from 'react';
import Meals from './components/Meals';
import Header from './components/Header';
import CartContextProvider from './store/cart-context.jsx'


function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;

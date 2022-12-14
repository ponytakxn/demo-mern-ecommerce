import CartPageComponent from "./components/CartPageComponent";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';


const CartPage = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const reduxDispatch = useDispatch();

    return <CartPageComponent cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} cartSubtotal={cartSubtotal} 
            reduxDispatch={reduxDispatch} />
        
};

export default CartPage;
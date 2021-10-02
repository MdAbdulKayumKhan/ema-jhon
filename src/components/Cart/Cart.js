import React from 'react';
import './Cart.css';
const Cart = (props) => {
     // console.log(props.cart)
    // const {cart} = props;
    // const totalReducer = (previous, product) => previous + product.price;
    // const total = cart.reduce(totalReducer, 0);
    const {cart} = props;
    // console.log(cart)
    let totalQuantity = 0;
    let total = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shipping = total > 0? 15 : 0;
    const tax = (total + shipping) *0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
           <h3>Order summary</h3>
            <h5>Items Orderd: {totalQuantity}</h5>
            <p>Total: {total.toFixed(2)}</p>
            <p>shipping: {shipping}</p>
            <p>tax: {tax.toFixed(2)}</p>
            <p>grand total: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;
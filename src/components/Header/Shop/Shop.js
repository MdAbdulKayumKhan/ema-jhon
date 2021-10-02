import React, { useEffect, useState } from 'react';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import { addToDb, getStoredCart } from '../../../utilities/fakedb'
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);
    useEffect( () => {
        // console.log('product call api')
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            // console.log('products received');
        })
    }, [])
    // [empty called only one time]
    useEffect( () => {
        // console.log('L S called');
        const savedCart = getStoredCart();
        // console.log(savedCart)
        const storeCart = [];
        if(products.length){
            for(const key in savedCart){
                // console.log(key, savedCart[key])
                // console.log(key)
               const addedProduct = products.find(product => product.key === key);
               if(addedProduct){
                   const quantity = savedCart[key];
                   addedProduct.quantity = quantity;
                //    console.log(addedProduct)
                storeCart.push(addedProduct);
               }
            //    console.log(key, addedProduct)
               
            }
            setCart(storeCart);
        }
    }, [products])
    // [dependency called many time]
    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        // save to localStorage 
        addToDb(product.key)
    }
    const handleSearch = event => {
       const searchText = event.target.value;
       const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
       console.log(matchedProducts.length);
    }
    return (
       <>
       {/* called fragment  */}
            <div className="search-container">
            <input 
            onChange={handleSearch}
            type="text"  
            placeholder="search" />
        </div>
        <div className="shop-container">
            <div className="product-container">
                
                {
                    products.map(product => <Product 
                    key={product.key}
                    product ={product}
                    handleAddToCart ={handleAddToCart}
                    />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
            
        </div>
       </>
    );
};

export default Shop;
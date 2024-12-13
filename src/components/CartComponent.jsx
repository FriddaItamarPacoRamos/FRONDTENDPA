import React from 'react';

function CartComponent({ cartItems, removeItem, purchase }) {
    return (
        <div id="cart">
            <img src="cart.png" alt="cart" />
            <div id="cart-list">
                <table className='table bg-dark'>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product.nameProduct}</td>
                                <td>{item.product.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.subTotal}</td>
                                <td><button className='btn btn-danger' onClick={() => removeItem(index)}>Remove</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <button className='btn btn-success' onClick={purchase}>Purchase</button>
            </div>
        </div>
    );
}

export default CartComponent;

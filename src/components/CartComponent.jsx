import React from 'react';

function CartComponent({ cartItems, removeItem, purchase }) {
    // Calcular el total del carrito
    const totalAmount = cartItems.reduce((total, item) => total + item.subTotal, 0);

    return (
        <div id="cart">

            <div id="cart-list">
                <table className='table bg-dark'>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.nameProduct}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.subTotal}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => removeItem(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <h3>Total: ${totalAmount}</h3>
                </div>
                <button className='btn btn-success' onClick={purchase}>Purchase</button>
            </div>
        </div>
    );
}

export default CartComponent;

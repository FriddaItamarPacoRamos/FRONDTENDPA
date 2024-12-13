import React, { useState } from 'react';
import CartComponent from '../components/CartComponent';
import { createOrder } from '../Services/OrderService'; // Importa la función createOrder desde tu servicio de órdenes

function Home() {
  const [compras, setCompras] = useState([]);  // Estado para almacenar las compras

  // Agregar un producto al carrito
  function addProductToCompra(product, cantidad) {
    const repeatedProduct = compras.find(element => element.product.id === product.id);
    if (repeatedProduct) {
      alert('Ya compró este producto');
      return;
    }
    const newDetalle = { product, cantidad, subTotal: product.price * cantidad };
    setCompras([...compras, newDetalle]);
  }

  // Eliminar un producto del carrito
  function removeProductFromCompra(index) {
    const newCompras = [...compras];
    newCompras.splice(index, 1);  // Eliminar el producto por índice
    setCompras(newCompras);
  }

  // Realizar la compra y enviar el pedido al backend
  function comprar() {
    if (compras.length > 0) {
      const newCompra = {
        codigo: "100",  // Puedes generar un código único o usar uno de prueba
        total: 0,
        detalle: compras.map(compra => ({
          productId: compra.product.id,
          cantidad: compra.cantidad,
          subTotal: compra.subTotal
        }))
      };

      // Usar la función createOrder para enviar la orden al backend
      createOrder(newCompra)
          .then(res => {
            console.log(res);
            setCompras([]);  // Limpiar el carrito después de realizar la compra
            alert('Compra realizada');
          })
          .catch(err => {
            console.error(err);
            alert('Hubo un error al realizar la compra');
          });
    } else {
      alert('Seleccione algo para comprar');
    }
  }

  return (
      <div className='bg-dark container text-center text-white home'>
        <CartComponent compras={compras} comprar={comprar} remove={removeProductFromCompra} />
        <h1>Farmacia Don Tito</h1>
        <ProductList addProduct={addProductToCompra} />
      </div>
  );
}

export default Home;

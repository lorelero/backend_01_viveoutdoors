import { createContext, useEffect, useState } from "react";

// Creación del context
export const viveContext = createContext();

const viveOutdoorProvider = ({ children }) => {
  const [producto, setProducto] = useState([]); //arreglo para almacenar los productos disponibles
  const [carrito, setCarrito] = useState([]); //arreglo para almacenar los productos agregados al carrito

  useEffect(() => { // Este efecto se ejecuta una sola vez cuando el componente se monta, llamando a getProductos() para cargar los datos de los productos.
    getProductos();
  }, []);

  const getProductos = async () => {  // es una función asincrónica que obtiene los datos de los productos de un archivo JSON y actualiza el estado "producto" con los datos obtenidos
    const res = await fetch("/viveOutdoor_productos.json"); 
    const producto = await res.json();
    setProducto(producto);
    console.log(producto); // la consola muestra la actualización del producto
  };

  function agregarCarrito({ id_producto, nombre, precio, foto }) {
    const producto = { id_producto, nombre, precio, foto, count: 1 };
    const indiceProductos = carrito.findIndex((item) => item.id_producto === id_producto);  //busca si el producto está en el carrito
    if (indiceProductos >= 0) {
      carrito[indiceProductos].count++; //si el producto ya existe, incrementa la cantidad del producto
      setCarrito([...carrito]);
    } else {
      setCarrito([...carrito, producto]); //si no existe, lo agrega como nuevo producto al carrito
    }
  }

  const sumarCantidad = (id_producto) => {  // incrementa la cantidad de un producto en el carrito
    const nuevoCarrito = carrito.map((item) =>
      item.id_producto === id_producto ? { ...item, count: item.count + 1 } : item
    );
    setCarrito(nuevoCarrito);
  };

  const restarCantidad = (id_producto) => { //reduce la cantidad de un producto y elimina el producto si la cantidad llega a cero
    const nuevoCarrito = carrito.map((item) =>
        item.id_producto === id_producto ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);
    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => { //calcula el costo total del carrito multiplicando el precio de cada producto por su cantidad (count) y sumando los resultados.
    return carrito.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  return (  //se devuelve el provider  que envuelve a los childrens y proporciona los valores y funciones para que otros componentes puedan acceder a ellos
    <viveContext.Provider
      value={{
        producto,
        setProducto,
        carrito,
        setCarrito,
        agregarCarrito,
        sumarCantidad,
        restarCantidad,
        calcularTotal,
      }}
    >
      {children}
    </viveContext.Provider>
  );
};

export default viveOutdoorProvider;

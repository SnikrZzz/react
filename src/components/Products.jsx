import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData("http://3.128.182.247/api/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getData(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  function handleDelete(code) {
    console.log(code);
    fetch("http://3.128.182.247/api/products/" + code, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(code);
          console.log("Product deleted successfully");
        } else {
          console.log("No sirve");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleEdit(code) {
  }

  // You can now use the 'datas' state in your JSX code
  return (
    <div className="products">
      <h1>Inicio</h1>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-container" key={product.id}>
            <div className="image-container" style={{ marginBottom: "-15px" }}>
              <img
                src={`http://3.128.182.247:5000/static/uploads/${product.picture}`}
                alt={product.name}
              />
            </div>
            <h3 style={{ marginBottom: "-10px" }}>{product.name}</h3>
            <p>{product.description}</p>
            <div className="buttons" style={{ marginBottom: "12px" }}>
              <button
                className="edit"
                onClick={() => handleEdit(product.eanCode)}
              >
                Editar
              </button>{" "}
              <button
                className="delete"
                onClick={() => handleDelete(product.eanCode)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

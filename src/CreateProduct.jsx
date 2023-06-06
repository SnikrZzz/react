import React, { useState } from "react";

function CreateProductPage() {
  const [eanCode, setEanCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');

    const product = {
      eanCode: eanCode,
      name: name,
      description: description,
      brand: brand,
      quantity: quantity,
      price: price,
      picture: imageInput.files[0].name,
      customer: { cedula: 1001202215 },
    };

    console.log("Producto creado:", product);
    sendData("http://3.128.182.247/api/products/save", product);
    // Aquí puedes hacer el envío de los datos a través de una solicitud HTTP o realizar otras acciones según tus necesidades
  };

  function sendData(url, object) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    }).then(function (response) {
      if (response.ok) {
        // Procesar la respuesta de la API
        response.json().then(function (data) {
          uploadImage();
          return true;
        });
      } else {
        // Manejar los errores de la API
        //console.log("Error en la solicitud");
        return false;
      }
    });
  }

  function uploadImage() {
    // Obtener el elemento de entrada de archivo
    var input = document.getElementById("imageInput");

    // Verificar si se seleccionó un archivo
    if (input.files.length > 0) {
      var file = input.files[0];

      // Crear un objeto FormData para enviar el archivo al servidor
      var formData = new FormData();
      formData.append("file", file);

      // Realizar una solicitud POST al servidor Flask
      fetch("http://3.128.182.247:5000/upload", {
        //Cambiar la IP local al del servicio
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data); // Manejar la respuesta del servidor
          console.log("SI SE SUBIO");
        })
        .catch((error) => {
          console.error("Error al enviar la imagen:", error);
        });
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  }

  return (
    <div style={{ marginBottom: "120px" }}>
      <h1>Crear Producto</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "0 auto",
          color: "black",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="eanCode">EAN Code:</label>
          <input
            type="text"
            id="eanCode"
            value={eanCode}
            onChange={(e) => setEanCode(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              height: "200px",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="imageInput">Imagen:</label>
          <input
            type="file"
            id="imageInput"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              background: "#fff",
              color: "black",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "#fff",
            border: "none",
          }}
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;

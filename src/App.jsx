import "./App.css";
import "./Product.css";
import React from "react";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import CreateProduct from "./CreateProduct";
import Product from "./components/Products";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="header">
          <ul className="list">
            <li>
              <Link to="/" className="link">Inicio</Link>
            </li>
            <li>
              <Link to="/create" className="link">Crear</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route path="/create" element={<CreateProduct/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

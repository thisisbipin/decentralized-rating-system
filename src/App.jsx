import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  let [productsList, setProductsList] = useState([
    {
      PID: 1,
      Name: "Laptop",
      ImageURL: "#",
      Price: 20,
      Details: "Fetching",
    },
    {
      PID: 2,
      Name: "Phone",
      ImageURL: "#",
      Price: 20,
      Details: "Fetching",
    },
  ]);
  return (
    <>
      <Header />
      <Products productsList={productsList} />
      <Footer />
    </>
  );
}

export default App;

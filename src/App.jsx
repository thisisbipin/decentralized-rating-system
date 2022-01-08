import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

function App() {
  let [productsList, setProductsList] = useState([
    {
      PID: 1,
      Name: "Laptop",
      ImageURL:
        "https://i.picsum.photos/id/188/300/300.jpg?hmac=O1Fgsa5q091m_1eNHYtavDoVNb6yIklGq1A67yv5_vk",
      Price: 20,
      Details: "Fetching",
    },
    {
      PID: 2,
      Name: "Phone",
      ImageURL:
        "https://i.picsum.photos/id/339/300/300.jpg?hmac=OGGRAko85waj1sgpjCL-gLOfoqFVF4167VXJk3sOx4E",
      Price: 20,
      Details: "Fetching",
    },
  ]);
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Products productsList={productsList} />}
          />
          <Route
            path="/product/:id"
            exact
            render={(props) => (
              <ProductDetail {...props} productsList={productsList} />
            )}
          />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;

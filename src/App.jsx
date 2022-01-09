import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

/* Firebase imports */
import { db } from "./components/firebase/Fire";
import fire from "./components/firebase/Fire";

function App() {
  let [productsList, setProductsList] = useState([]);
  useEffect(() => {
    db.collection("productData")
      .get()
      .then((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((element) => {
          var data = element.data();
          // console.log(data);
          products.push(data);
        });
        products = products.sort((a, b) => {
          return a.PID < b.PID ? -1 : a.PID > b.PID ? 1 : 0;
        });
        //console.log(products);
        setProductsList(products);
      });
  }, []);
  return (
    <>
      <Router>
        <Header />
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

import React from "react";
import "./css/products.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Products extends React.Component {
  state = {
    products: [],
  };
  constructor(props) {
    super(props);
    this.state.products = props.productsList;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.productsList });
  }

  render() {
    return (
      <>
        <section className="products">
          <h1 className="products__main-title">
            <b>Products 🛍️ </b>
          </h1>
          <div className="products__products-container">
            {this.state.products.map((eachproduct) => (
              <Link key={eachproduct.PID} to={"/product/" + eachproduct.PID}>
                <div className="products__products-container__card card">
                  <img
                    src={eachproduct.ImageURL}
                    className="card-img-top"
                    alt={eachproduct.Name}
                  />
                  <div className="products__products-container__card__card-body card-body">
                    <h5>{eachproduct.Name}</h5>
                    <h6>Rating: 5 ⭐ </h6>
                    <p className="products__products-container__card__card-text card-text">
                      {eachproduct.Details}
                    </p>
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default Products;

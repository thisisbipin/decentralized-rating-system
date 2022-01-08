import React from "react";
import "./css/products.css";

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
              <div
                className="products__products-container__card card"
                key={eachproduct.PID}
              >
                <img
                  src={eachproduct.ImageURL}
                  className="card-img-top"
                  alt={eachproduct.Name}
                />
                <div className="products__products-container__card__card-body card-body">
                  <h5 className="products__products-container__card__card-title card-title">
                    {eachproduct.Name}
                  </h5>
                  <p>Rating: 5 ⭐ </p>
                  <p className="products__products-container__card__card-text card-text">
                    {eachproduct.Details}
                  </p>
                  <a className="btn btn-primary">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default Products;

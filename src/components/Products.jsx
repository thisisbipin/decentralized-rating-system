import React from "react";
import "./css/products.css";
import { Link } from "react-router-dom";

import web3 from "../web3";
import { ratingAbi, ratingAddress } from "../Rating";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      ismetamaskavailable: true,
      ratingContract: undefined,
      ratings_array: [],
    };
    this.state.products = props.productsList;
  }

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData() {
    let accounts;
    try {
      accounts = await web3.eth.getAccounts();
    } catch (err) {
      this.state.ismetamaskavailable = false;
      console.log("please install metamask");
      return;
    }

    this.setState({ account: accounts[0] });

    const ratingContract = new web3.eth.Contract(ratingAbi, ratingAddress);
    this.setState({ ratingContract });
    console.log(ratingContract);

    const count = await ratingContract.methods.getCount(1).call();
    const points = await ratingContract.methods.getPoints(1).call();
    console.log(count, points);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ products: nextProps.productsList });
    console.log(this.state.products);
  }

  render() {
    return (
      <>
        <section className="products">
          <h1 className="products__main-title">
            <b>Products 🛍️ </b>
          </h1>
          <div className="products__products-container">
            {this.state.products.map((eachproduct) => {
              console.log(eachproduct);
              return (
                <Link key={eachproduct.PID} to={"/product/" + eachproduct.PID}>
                  <div className="products__products-container__card card">
                    <img
                      src={eachproduct.ImageURL}
                      className="card-img-top"
                      alt={eachproduct.Name}
                    />
                    <div className="products__products-container__card__card-body card-body">
                      <h5>{eachproduct.Name}</h5>
                      <h6>
                        <b>Price:</b> {eachproduct.Price} ETH{" "}
                      </h6>
                      <p className="products__products-container__card__card-text card-text">
                        {eachproduct.Details}
                      </p>
                      <button className="btn btn-primary">View Details</button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </>
    );
  }
  setLoading() {
    return (
      <div className="productdetail__loader">
        <h1>Loading...</h1>{" "}
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Products;

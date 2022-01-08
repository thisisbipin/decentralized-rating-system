import React from "react";
import "./css/header.css";
import meta_basket_logo from "../assets/meta-basket-icon.png";

class Header extends React.Component {
  render() {
    return (
      <>
        <nav className="header navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={meta_basket_logo}
                alt="Meta Basket Logo"
                className="header__brand__img"
              />
              Meta Basket
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Write Review
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="dummy-head"></div>
      </>
    );
  }
}

export default Header;

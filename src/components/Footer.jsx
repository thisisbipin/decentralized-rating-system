import React from "react";
import "./css/footer.css";
import buy_with_meta_mask from "../assets/Metamask-logo.jpg";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__row row">
          <div className="col-sm-3">
            <h4 className="title">Meta Basket</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              suscipit, libero a molestie consectetur, sapien elit lacinia mi.
            </p>
          </div>

          <div className="col-sm-3 payment-div">
            <h4 className="title">Payment Methods</h4>
            <p>you can pay with Meta Mask</p>
            <ul className="payment">
              <li>
                <a href="#">
                  <div className="footer__buy_with_meta_mask">
                    <img src={buy_with_meta_mask} alt="" />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />

        <div className="row text-center"> © 2022. Meta Basket</div>
      </div>
    </footer>
  );
}

export default Footer;

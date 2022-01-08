import React from "react";

class Admin extends React.Component {
  state = {
    currentproduct: {
      PID: -1,
      ImageURL: "#",
      Price: 0,
      Details: "",
    },
  };
  render() {
    return (
      <div className="productdetail__product-review-area__container__content__create-review-box">
        <form action="#/" className="form-contact form-review mt-3">
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              type="text"
              placeholder="Enter your name"
              required=""
              onChange={(e) => this.handleInput(e.target.value, "PID")}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="subject"
              type="text"
              placeholder="Enter Subject"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control different-control w-100"
              name="textarea"
              id="textarea"
              cols="30"
              rows="5"
              placeholder="Enter Message"
              onChange={(e) => this.handleInput(e.target.value, "review-text")}
            ></textarea>
          </div>
          <div className="form-group text-center text-md-right mt-3">
            <button
              className="btn btn-primary"
              onClick={this.handleWriteReview}
            >
              <i className="fa-solid fa-pen-nib"></i> | Write my Review
            </button>
          </div>
        </form>
      </div>
    );
  }
  handleInput(value, type) {
    switch (type) {
      case "name":
        this.state.createrating.name = value;
        break;
      case "review-text":
        this.state.createrating.review_text = value;
        break;
      case "stars":
        this.setState({
          createrating: { ...this.createrating, star: parseFloat(value) },
        });
        break;
    }
  }
}

export default Admin;

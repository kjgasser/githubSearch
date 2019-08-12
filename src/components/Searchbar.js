import React, { Component } from "react";
import { MDBCol, MDBIcon } from "mdbreact";

class Searchbar extends Component {
  render() {
    return (
      <MDBCol md="6">
        <div>
          <form
            className="d-flex align-items-center input-group md-form form-sm form-1 pl-0"
            onSubmit={this.props.handleSearch}
          >
            <div className="input-group-prepend">
              <span
                className="input-group-text pink lighten-3"
                id="basic-text1"
              >
                <MDBIcon
                  className="text-white"
                  icon="search"
                  onClick={this.props.handleSearch}
                />
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search for a Github User"
              aria-label="Search"
              value={this.props.searchword}
              name="searchword"
              onChange={this.props.changeHandler}
            />
          </form>
        </div>
      </MDBCol>
    );
  }
}

export default Searchbar;

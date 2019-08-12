import React from "react";
import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle
} from "mdbreact";
import pinkGradient from "../images/pink-gradient.png";
import Githublogo from "../images/github-logo.png";
import Searchbar from "./Searchbar.js";

const Jumbotron = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBJumbotron style={{ padding: 0 }}>
            <MDBCol
              className="text-white text-center py-6 px-3 my-5"
              style={{ backgroundImage: `url(${pinkGradient})` }}
            >
              <MDBCol className="py-5">
                <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                  <img
                    src={Githublogo}
                    alt="Github Logo silhouette"
                    style={{ height: "100px" }}
                  />
                  <br />
                  <strong>Github Search - created for ThisDot</strong>
                </MDBCardTitle>
                <p className="mx-5 mb-5">
                  A project that leverages the Github Search API to bring you
                  results.
                </p>
              </MDBCol>
            </MDBCol>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Jumbotron;

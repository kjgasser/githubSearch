import React, { Component } from "react";
import {
  MDBCard,
  MDBCardUp,
  MDBCardBody,
  MDBAvatar,
  MDBRotatingCard,
  MDBIcon
} from "mdbreact";
import axios from "axios";

class UserCard extends Component {
  state = {
    flipped: false,
    specResults: []
  };

  componentDidMount() {
    this.setState({
      specResults: []
    });
    axios
      .get(this.props.url)
      .then(response => {
        this.setState({
          specResults: response.data
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

  handleFlipping = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  render() {
    const colStyle = { maxWidth: "22rem" };
    const topStyle = { background: this.props.background };

    return (
      <MDBRotatingCard
        flipped={this.state.flipped}
        className="text-center h-100 w-100"
        style={colStyle}
      >
        <MDBCard className="face front">
          <MDBCardUp style={topStyle} />
          <MDBAvatar className="mx-auto white" circle>
            <img
              src={this.props.avatar_url}
              alt=""
              className="rounded-circle"
            />
          </MDBAvatar>
          <MDBCardBody>
            <h4 className="font-weight-bold mb-3">{this.props.login}</h4>
            <p className="font-weight-bold blue-text">
              {this.state.specResults.location}
            </p>
            <a
              href="#!"
              className="rotate-btn"
              data-card="card-1"
              onClick={this.handleFlipping}
            >
              <MDBIcon icon="redo" /> Click here to rotate
            </a>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className="face back">
          <MDBCardBody>
            <h4 className="font-weight-bold">About</h4>
            <hr />
            <p>bio: {this.state.specResults.bio}</p>
            <p>followers: {this.state.specResults.followers}</p>
            <p>public repositories: {this.state.specResults.public_repos}</p>
            <hr />
            <ul className="list-inline py-2">
              <li className="list-inline-item">
                <a href={this.props.html_url} className="p-2 fa-lg fb-ic">
                  <MDBIcon icon="github" brand />
                </a>
              </li>
            </ul>
            <a
              href="#!"
              className="rotate-btn"
              data-card="card-1"
              onClick={this.handleFlipping}
            >
              <MDBIcon icon="undo" /> Click here to rotate back
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBRotatingCard>
    );
  }
}

export default UserCard;

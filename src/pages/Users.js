import React, { Component } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBPagination,
  MDBPageItem,
  MDBPageNav
} from "mdbreact";
import Jumbotron from "../components/Jumbotron";
import Searchbar from "../components/Searchbar";
import UserCard from "../components/UserCard";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: "",
      results: "",
      totalResults: 0,
      pages: 0,
      activePage: 1,
      activeResults: [],
      resultsPerPage: 8
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handlePagClick = this.handlePagClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  //triggers whenever the search button is clicked or enter is pressed
  handleSearch = e => {
    e.preventDefault();
    this.setState({
      response: [],
      totalResults: 0
    });
    axios
      .get(`https://api.github.com/search/users?q=` + this.state.searchword)
      .then(response => {
        this.setState({
          results: response.data.items,
          totalResults: response.data.items.length
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  //sets the state of search input prior to submission
  changeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  //clicking on a number in the pagination list
  handlePagClick(event) {
    this.setState({
      activePage: Number(event.target.id)
    });
  }

  //clicking "next" in the pagination list
  handleNextClick() {
    let nextPage = this.state.activePage + 1;
    if (nextPage > this.state.totalResults / this.state.resultsPerPage + 1) {
      this.setState({
        activePage: this.state.activePage
      });
    } else {
      this.setState({
        activePage: nextPage
      });
    }
  }

  //clicking "previous" in the pagination list
  handlePreviousClick() {
    let prevPage = this.state.activePage - 1;
    if (prevPage === 0) {
      this.setState({
        activePage: this.state.activePage
      });
    } else {
      this.setState({
        activePage: prevPage
      });
    }
  }

  render() {
    if (this.state.totalResults === 0) {
      return (
        <MDBContainer>
          <MDBRow>
            <Jumbotron />
          </MDBRow>
          <MDBRow>
            <MDBCol md="3" />
            <Searchbar
              handleSearch={this.handleSearch}
              changeHandler={this.changeHandler}
              searchword={this.state.searchword}
            />
            <MDBCol md="3" />
          </MDBRow>
        </MDBContainer>
      );
    } else if (this.state.totalResults > 0) {
      const colorlist = [
        "purple",
        "indigo",
        "blue",
        "cyan",
        "green",
        "red",
        "orange",
        "yellow"
      ];

      const { results, activePage, resultsPerPage } = this.state;

      // Logic for displaying active results
      const indexOfLastResult = activePage * resultsPerPage;
      const indexOfFirstResult = indexOfLastResult - resultsPerPage;
      const activeResults = results.slice(
        indexOfFirstResult,
        indexOfLastResult
      );

      const renderResults = activeResults.map((results, index) => {
        return (
          <MDBCol md="3" style={{ minHeight: "30rem" }}>
            <UserCard
              key={index}
              login={results.login}
              avatar_url={results.avatar_url}
              html_url={results.html_url}
              type={results.type}
              starred_url={results.starred_url}
              url={results.url}
              background={colorlist[[index % colorlist.length]]}
            />
          </MDBCol>
        );
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(this.state.totalResults / resultsPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <MDBPageItem>
            <MDBPageNav key={number} id={number} onClick={this.handlePagClick}>
              {number}
            </MDBPageNav>
          </MDBPageItem>
        );
      });

      return (
        <MDBContainer>
          <MDBRow>
            <Jumbotron />
          </MDBRow>
          <MDBRow>
            <MDBCol md="3" />
            <Searchbar
              handleSearch={this.handleSearch}
              changeHandler={this.changeHandler}
              searchword={this.state.searchword}
            />
            <MDBCol md="3" />
          </MDBRow>
          <div>
            <MDBRow className="pt-5 pb-5 d-flex align-items-center">
              <h3 className="align-items-center">
                {this.state.totalResults} results for {this.state.searchword}
              </h3>
            </MDBRow>

            <MDBRow>{renderResults}</MDBRow>
          </div>

          <MDBRow>
            <MDBCol>
              <MDBPagination className="mb-5">
                <MDBPageItem>
                  <MDBPageNav
                    onClick={this.handlePreviousClick}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">Previous</span>
                  </MDBPageNav>
                </MDBPageItem>
                {renderPageNumbers}
                <MDBPageItem>
                  <MDBPageNav onClick={this.handleNextClick} aria-label="Next">
                    <span aria-hidden="true">Next</span>
                  </MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }
  }
}
export default Users;

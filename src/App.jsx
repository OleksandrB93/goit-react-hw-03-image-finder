import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";

import SearchBar from "components/SearchBar/SearchBar";
import ImageGallery from "components/ImageGallery/ImageGallery";

export default class App extends Component {
  state = { inputValue: "" };

  handleFormSubmit = (inputValue) => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue}/>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          theme="colored"
        />
      </div>
    );
  }
}

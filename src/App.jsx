import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";

import ImageError from "components/ImageError/ImageError";
import Notification from "components/Notification/Notification";
import API from "components/api/api";
import ButtonLoadMore from "components/ButtonLoadMore/ButtonLoadMore";
import ImageGalleryList from "components/ImageGalleryList/ImageGalleryList";
import SearchBar from "components/SearchBar/SearchBar";
// import ImageGallery from "components/ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    inputValue: "",
    query: "",
    page: 1,
    images: [],
    error: null,
    status: "idle",
    isLoading: true,
  };

  handleFormSubmit = (inputValue) => {
    this.setState({ inputValue });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const prevName = prevState.inputValue;
    const newName = this.state.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;


    if (prevPage !== nextPage || prevName !== newName) {
      this.setState({ isLoading: true });

      API.fetchImages(newName, nextPage)
        .then((images) => {
          console.log(images)
          this.setState({
            images,
            status: "resolved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { images, error, isLoading, status } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          theme="colored"
        />
        {status === "idle" && <h1>Please, enter your request</h1>}

        {status === "rejected" && <ImageError message={error.message} />}

        {images.totalHits === 0 && (
          <Notification notification={"No images were found"} />
        )}

        {status === "resolved" && (
          <div>
            <ImageGalleryList images={images} isLoading={isLoading} />
            <ButtonLoadMore onClick={this.loadMore} images={images} />
          </div>
        )}
      </div>
    );
  }
}

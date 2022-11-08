import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import axios from "axios";

import ImageError from "components/ImageError/ImageError";
import Notification from "components/Notification/Notification";
import API from "components/api/api";
import ButtonLoadMore from "components/ButtonLoadMore/ButtonLoadMore";
import ImageGalleryList from "components/ImageGalleryList/ImageGalleryList";
import SearchBar from "components/SearchBar/SearchBar";

const STATUS = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

export default class App extends Component {
  state = {
    inputValue: "",
    query: "",
    page: 1,
    images: [],
    error: null,
    status: "idle",
    isLoading: true,
    loadBtnIsShown: false,
    totalResalts: [],
  };

  handleFormSubmit = (inputValue) => {
    this.setState({ inputValue, images: [], page: 1 });
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
    const totalImages = this.state.totalResalts;

    if (prevPage !== nextPage || prevName !== newName) {
      this.setState({ isLoading: true, loadBtnIsShown: false });

      try {
        const images = await API.fetchImages(newName, nextPage);
        if (images.totalHits === 0) {
          throw new Error(
            "There are no images found for your request. Please, try again"
          );
        }
        const remainingPages = this.getRemainingPages(images.totalHits);
        if (remainingPages > 0) this.setState({ loadBtnIsShown: true });
        console.log(images.totalHits);

        this.setState((prevState) => ({
          images: [...prevState.images, ...images.hits],
          status: "resolved",
          totalResalts: images.totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      }
    }
    //   API.fetchImages(newName, nextPage)
    //     .then((images) => {
    //       this.setState((prevState) => ({
    //         images: [...prevState.images, ...images.hits],
    //         status: "resolved",
    //         totalResalts: images.totalHits,
    //       }));
    //     })
    //     .catch((error) => this.setState({ error, status: "rejected" }))
    //     .finally(() => this.setState({ isLoading: false }));

    //   const remainingPages = this.getRemainingPages(totalImages);
    //   if (remainingPages > 0) this.setState({ loadBtnIsShown: true });
    // }
  }

  getRemainingPages = (totalImages) => {
    return Math.ceil(totalImages / API.perPage) - this.state.page;
  };

  render() {
    const { images, error, isLoading, status, loadBtnIsShown } = this.state;

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

        {this.state.totalResalts === 0 && (
          <Notification
            notification={
              "There are no images found for your request. Please try again"
            }
          />
        )}

        {status === "resolved" && (
          <div>
            <ImageGalleryList images={images} isLoading={isLoading} />
          </div>
        )}
        {loadBtnIsShown && <ButtonLoadMore onClick={this.loadMore} />}
      </div>
    );
  }
}

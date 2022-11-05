import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import ImageError from "components/ImageError/ImageError";
import Notification from "components/Notification/Notification";
import API from "components/api/api";
import ButtonLoadMore from "components/ButtonLoadMore/ButtonLoadMore";

export default class ImageGallery extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    error: null,
    status: "idle",
    isLoading: false,
    loadBtnIsShown: false,
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const newName = this.props.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || prevName !== newName) {
      this.setState({ isLoading: true, loadBtnIsShown: false });

      API.fetchImages(newName, nextPage)
        .then((images) => {
          this.setState({ images, status: "resolved" });
        })
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { images, error, isLoading, status } = this.state;
    if (status === "idle") {
      return <h1>Please, enter your request</h1>;
    }

    if (status === "rejected") {
      return <ImageError message={error.message} />;
    }

    if (images.totalHits === 0) {
      return <Notification notification="No images were found" />;
    }

    if (status === "resolved") {
      return (
        <div>
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} isLoading={isLoading} />
          </ul>
          <ButtonLoadMore onClick={this.loadMore} images={images} />
        </div>
      );
    }
  }
}

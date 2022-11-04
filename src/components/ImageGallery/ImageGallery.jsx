import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import ImageError from "components/ImageError/ImageError";
import API from "components/api/api";

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: "idle",
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const newName = this.props.inputValue;

    if (prevName !== newName) {
      this.setState({ isLoading: true });

      API.fetchImages(newName)
        .then((images) => this.setState({ images, status: "resolved" }))
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

    if (status === "resolved") {
      return (
        <ul className="ImageGallery">
          <ImageGalleryItem images={images} isLoading={isLoading} />
        </ul>
      );
    }
  }
}

import { API_KEY, BASE_URL } from "components/Constants/Constants";
import React, { Component } from "react";
import axios from "axios";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const newName = this.props.inputValue;
    const url = `${BASE_URL}/?key=${API_KEY}&q=${newName}&image_type=photo`;

    if (prevName !== newName) {
      this.setState({ isLoading: true });

      const response = await axios.get(url);
      this.setState({ images: response.data.hits, isLoading: false });
    }
  }
  render() {
    const { images, isLoading  } = this.state;
    return (
      <div>
        {this.state.images && (
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} />
          </ul>
        )}
      </div>
    );
  }
}

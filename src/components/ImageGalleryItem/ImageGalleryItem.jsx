import React from "react";
import MyLoader from "components/Loader/Loader";

export default function ImageGalleryItem({ images, isLoading }) {
  return images.hits.map((image) => (
    <li className="ImageGalleryItem" key={image.id}>
      {isLoading ? (
        <MyLoader />
      ) : (
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt="image"
        />
      )}
    </li>
  ));
}

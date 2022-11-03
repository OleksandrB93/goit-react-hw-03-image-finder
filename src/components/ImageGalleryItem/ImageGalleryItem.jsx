import React from "react";

export default function ImageGalleryItem({ images }) {
  console.log(images);

  return images.map((image) => (
    <li className="ImageGalleryItem" key={image.id}>
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt="image"
      />
    </li>
  ));
}

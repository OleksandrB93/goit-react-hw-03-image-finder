import React from "react";

export default function ButtonLoadMore({ onClick, images }) {

  return (
    <div>
      {images.hits.length >= 12 && (
        <button className="Button" type="submit" onClick={onClick}>
          load more
        </button>
      )}
    </div>
  );
}

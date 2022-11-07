
import MyLoader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import React, { Component } from "react";

export default class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalIsOpen }) => ({
      modalIsOpen: !modalIsOpen,
    }));
  };
  render() {
    const { smallImage, largeImage, tags, isLoading, id } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <>
        <li className="ImageGalleryItem" key={id} onClick={this.toggleModal}>
          {isLoading ? (
            <MyLoader />
          ) : (
            <img
              className="ImageGalleryItem-image"
              src={smallImage}
              alt={tags}
            />
          )}
        </li>
        {modalIsOpen && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImage} alt={tags} />
            <p className="tags">{tags}</p>
          </Modal>
        )}
      </>
    );
  }
}

import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = e => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      };
    });
  };

  render() {
    const {
      imageData: { webformatURL, tags, largeImageURL },
    } = this.props;
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
        />
        {showModal && (
          <Modal
            url={largeImageURL}
            alt={tags}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

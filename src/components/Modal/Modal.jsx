import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRootRef = document.getElementById('modal-root');

export default class Modal extends Component {
  state = {};
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    const { url, alt } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRootRef
    );
  }
}

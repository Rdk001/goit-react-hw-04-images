import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalW } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImageURL, user }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackDropClick = e => {
    const backDrop = e.currentTarget;
    const modal = e.target;

    if (backDrop === modal) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalW>
        <img src={largeImageURL} alt={user} />
      </ModalW>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

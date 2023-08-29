import './ErrorModal.css';
import { useState } from 'react'; // Asegurarse de importar useState

interface ErrorProps {
  errorMessage: string;
  onClose: () => void; 
}

export default function ErrorModal({ errorMessage, onClose }: ErrorProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isVisible ? 'show' : ''}`}>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="red" d="M13.414 12l3.293-3.293a1 1 0 0 0-1.414-1.414L12 10.586 8.707 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 1 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414L13.414 12z"/>
            </svg>
          </div>
          <h2 className="modal-title">Error</h2>
          <p className="modal-message">{errorMessage}</p>
          <div className="modal-footer">
            <button className="modal-button" onClick={handleClose}> OK </button>
          </div>
        </div>
      </div>
    </div>
  );
}

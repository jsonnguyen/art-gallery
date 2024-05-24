import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

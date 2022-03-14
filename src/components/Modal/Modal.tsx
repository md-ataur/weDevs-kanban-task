import React from 'react';
import './Modal.css';

const Modal = (props: any) => {
    return (
        <div className="modal" onClick={() => (props.onClose ? props.onClose() : '')}>
            <div
                className="modal_content"
                onClick={(e) => e.stopPropagation()} /* stop event bubbling */
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;

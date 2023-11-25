import { ReactElement } from "react";
import { Button } from "../Button";

interface ModalProps {
    id: string;
    title: string;
    content: ReactElement | ReactElement[];
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
}

import './Modal.style.scss';

export const Modal = ({ id, title, content, isOpen, onClose, onSubmit } : ModalProps) => {
    return (
        <dialog id={id} open={isOpen} className="modal"> 
            <div className="modal_container">
                <div className="modal_title">
                    <h2>{title}</h2>
                </div>
                <div className="modal_content">
                    {content}
                </div>
                <div className="modal_footer">
                 <Button data-testid='modal-cancel-button' onClick={onClose}>
                    close
                 </Button>
                 {
                    onSubmit && 
                    <Button data-testid='modal-submit-button' type='submit' onClick={onSubmit} />
                }                 
                </div>
            </div>
        </dialog>
    )
}
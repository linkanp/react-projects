import { forwardRef, useImperativeHandle, useRef  } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({id, open, children }, ref) {
    const dialog = useRef();
    const openFlag = open ? 'true' : '';

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
            close: () => {
                dialog.current.close();
            }
        }
    });

    return createPortal (
        <dialog className="modal" ref={dialog} id={id} open={open}>
            { children }
        </dialog>, 
        document.getElementById('modal')
    );
});

export default Modal;
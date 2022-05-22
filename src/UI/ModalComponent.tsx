import { Button, Modal, ModalProps } from 'react-bootstrap';
import React from 'react';
import { createPortal } from 'react-dom';

interface OverlayInterface extends ModalProps {
	children: React.ReactNode;
	onClose: () => void;
  onSubmit?:()=>void;
	show: boolean;
}
const Overlay: React.FC<OverlayInterface> = (props) => {
	// const [show, setShow] = useState(true);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	return (
		<Modal show={props.show} onHide={props.onClose} style={{top:'120px'} }>
			{props.children}
		</Modal>
	);
};

const ModalComponent: React.FC<OverlayInterface> = (props) => {
	return (
		<React.Fragment>
			{createPortal(
				<Overlay onClose={props.onClose} show={props.show} onSubmit ={props.onSubmit}>{props.children}</Overlay>,
				document.getElementById('modal-root')!
			)}
		</React.Fragment>
	);
};
export default ModalComponent;

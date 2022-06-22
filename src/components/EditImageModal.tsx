import ModalComponent from '../UI/ModalComponent';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, FormEvent } from 'react';
import { useEditImage } from '../services/CollectionServices';

const EditImageModal: React.FC<{
	onClose: () => void;
	show: boolean;
	id: string;
	cloudinary_id: string | undefined;
}> = (props) => {
	const [uploadedImage, setUploadedImage] = useState<any>(null);
	const { sendEditImageRequest, isLoading } = useEditImage();
	const { t } = useTranslation();

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();
		const formData = new FormData();

		if (!uploadedImage) {
			props.onClose();
			return;
		}
		formData.append('image', uploadedImage);
		if (props.cloudinary_id) {
			formData.append('cloudinary_id', props.cloudinary_id);
		}

		await sendEditImageRequest(props.id, formData);
		props.onClose();
	};
	return (
		<ModalComponent className="p-2" onClose={props.onClose} show={props.show}>
			<Modal.Header closeButton>
				<Modal.Title>{t('edit_image')}</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={submitForm}
				className="mx-auto my-3"
				style={{ width: '90%' }}
			>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="image">{t('choose_image')}</Form.Label>
					<Form.Control
						id="image"
						name="image"
						type="file"
						onChange={(event: any) => setUploadedImage(event.target.files[0])}
						data-browse="Your custom label"
					/>
				</Form.Group>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.onClose}>
						{t('close')}
					</Button>
					<Button variant="success" type="submit">
						{isLoading?`${t("sending")}...`:t('confirm')}
					</Button>
				</Modal.Footer>
			</Form>
		</ModalComponent>
	);
};

export default EditImageModal;

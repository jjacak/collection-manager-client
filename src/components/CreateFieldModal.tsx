import ModalComponent from '../UI/ModalComponent';
import { Formik, Field, Form } from 'formik';
import SelectFormField from '../UI/FormFields/SelectFormField';
import TextFormField from '../UI/FormFields/TextFormField';
import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const CreateFieldModal: React.FC<{
	onClose: () => void;
	show: boolean;
	onSubmit?: (values: { label: string; type: string }) => void;
}> = (props) => {
	const { t } = useTranslation();

	const schema = yup.object().shape({
		label: yup.string().required(`${t("field_required")}`),
		type: yup.string().required(`${t("field_required")}`),
	});
	return (
		<ModalComponent onClose={props.onClose} show={props.show}>
			<Modal.Header closeButton>
				<Modal.Title>{t("add_field")}</Modal.Title>
			</Modal.Header>
			<Formik
				validationSchema={schema}
				onSubmit={(val) => {
					props.onSubmit && props.onSubmit(val);
				}}
				initialValues={{ label: '', type: '' }}
			>
				{({ handleSubmit, handleChange }) => (
					<Form
						noValidate
						onSubmit={handleSubmit}
						className="mx-auto"
						style={{ width: '90%' }}
					>
						<Field
							name="type"
							options={[
								{ label:` ${t("text_field")}`, value: 'text' },
								{ label: ` ${t("text_area")}`, value: 'textarea' },
								{ label: ` ${t("number")}`, value: 'number' },
								{ label: ` ${t("date")}`, value: 'date' },
								{ label: ` ${t("radio_buttons")}`, value: 'radio' },
							]}
							label={`${t("type")}:`}
							component={SelectFormField}
						/>
						<Field
							name="label"
							label={`${t("name")}:`}
							component={TextFormField}
						/>
						<Modal.Footer>
							<Button variant="secondary" onClick={props.onClose}>
								{t("close")}
							</Button>
							<Button variant="success" type="submit">
								{t("confirm")}
							</Button>
						</Modal.Footer>
					</Form>
				)}
			</Formik>
		</ModalComponent>
	);
};

export default CreateFieldModal;

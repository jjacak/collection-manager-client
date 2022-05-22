import { Formik, Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import Button from '../UI/Button';
import { useState, useRef } from 'react';
import Radio from '../UI/FormFields/Radio';
import Textarea from '../UI/FormFields/Textarea';
import YupSchemaGenerator from '../utils/YupSchemaGenerator';
import CreateFieldModal from './CreateFieldModal';
import { v4 as uuid } from 'uuid';
import Autocomplete from '../UI/FormFields/Autocomplete';
import { useTranslation } from 'react-i18next';

type initialValuesType = {
	[key: string]: string;
};
let initialValues: initialValuesType = {};

const AddItemForm = () => {
	const tagsRef = useRef<any>();
    const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formFields, setFormFields] = useState([
		{
			name: 'name',
			label: `${t("item_name")}:`,
			type: 'text',
			validationType: 'string',
			validation: { type: 'required', params: `${t("field_required")}` },
		},
	]);
	const yupSchema = formFields.reduce(YupSchemaGenerator, {});
	const schema = yup.object().shape(yupSchema);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		setIsModalOpen(false);
	};
	const addField = (values: { label: string; type: string }) => {
		let validationType = values.type;
		if (
			values.type === 'textarea' ||
			values.type === 'text' ||
			values.type === 'radio'
		) {
			validationType = 'string';
		}
		const newField = {
			name: uuid(),
			label: values.label,
			type: values.type,
			validationType: validationType,
			validation: { type: 'required', params: 'This field is required.' },
		};
		const updatedFields = [...formFields, newField];
		setFormFields(updatedFields);
		setIsModalOpen(false);
	};
	formFields.forEach((item) => {
		initialValues[item.name] = '';
	});

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					console.log('SUBMIT', values);
					console.log(tagsRef?.current?.getTags());
				}}
				initialValues={initialValues}
			>
				{({ handleSubmit, handleChange }) => (
					<Form
						noValidate
						onSubmit={handleSubmit}
						className="mx-auto mt-5 "
						style={{
							width: '900px',
							maxWidth: '100%',
						}}
					>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="autocomplete">{t('tags')}</Form.Label>
							<Autocomplete ref={tagsRef} />
						</Form.Group>

						{formFields.map((f, i) => {
							if (f.type === 'textarea') {
								return (
									<Field
										key={i}
										label={f.label}
										name={f.name}
										component={Textarea}
									/>
								);
							}
							if (f.type === 'radio') {
								return (
									<Form.Group key={i}>
										<Form.Label>{f.label}</Form.Label>
										<Field
											component={Radio}
											label={`${t("yes")}`}
											value="true"
											name={f.name}
											onChange={handleChange}
										/>
										<Field
											component={Radio}
											label={`${t("no")}`}
											value="false"
											name={f.name}
											onChange={handleChange}
										/>
										<ErrorMessage name={`${f.name}`} />
									</Form.Group>
								);
							}
							return (
								<Field
									key={i}
									label={f.label}
									type={f.type}
									name={f.name}
									component={TextFormField}
								/>
							);
						})}
						<div className="text-center">
							<Button className="button--alt" type="button" onClick={showModal}>
								{t("add_field")}
							</Button>
						</div>
						<div className="my-4 text-center">
							<Button type="submit" className="button">
								{isLoading ? `${t('sending')}...` : `${t('add_item')}`}
							</Button>
						</div>
					</Form>
				)}
			</Formik>

			{isModalOpen && (
				<CreateFieldModal
					onClose={hideModal}
					show={isModalOpen}
					onSubmit={addField}
				/>
			)}
		</>
	);
};

export default AddItemForm;

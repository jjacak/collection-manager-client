import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button as BButon } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import Button from '../UI/Button';
import { useState, useRef } from 'react';
import Radio from '../UI/FormFields/Radio';
import Textarea from '../UI/FormFields/Textarea';
import YupSchemaGenerator from '../utils/YupSchemaGenerator';
import CreateFieldModal from './CreateFieldModal';
import { v4 as uuid } from 'uuid';
import Autocomplete, { TagsType } from '../UI/FormFields/Autocomplete';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

type initialValuesType = {
	[key: string]: string;
};
type formDataType = {
	[key: string]: { value: string; label: string; type: string };
};

const AddItemForm = () => {
	const tagsRef = useRef<any>();
	const { t } = useTranslation();
	const { getAccessTokenSilently, user } = useAuth0();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);
	const [formFields, setFormFields] = useState([
		{
			name: 'name',
			label: `${t('item_name')}:`,
			type: 'text',
			validationType: 'string',
			validation: { type: 'required', params: `${t('field_required')}` },
		},
	]);
	const yupSchema = formFields.reduce(YupSchemaGenerator, {});
	const schema = yup.object().shape(yupSchema);
	const { id } = useParams();
	const navigate = useNavigate();

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

	const deleteField = (name: string) => {
		setFormFields((previous) =>
			previous.filter((field) => field.name !== name)
		);
	};

	let initialValues: initialValuesType = {};
	formFields.forEach((item) => {
		initialValues[item.name] = '';
	});
	console.log(error);
	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={async (values, { resetForm }) => {
					setError(null);
					setIsLoading(true);
					try {
						const tags = tagsRef.current
							.getTags()
							.map((t: TagsType) => t.value);
						let formData: formDataType = {};

						for (let [key, value] of Object.entries(values)) {
							const currentField = formFields.filter((f) => f.name === key)[0];

							formData[key] = {
								value: value,
								label: currentField.label,
								type: currentField.type,
							};
						}

						const data = {
							...formData,
							tags: tags,
							author: user?.sub,
							date: new Date(),
						};
						const accessToken = await getAccessTokenSilently({
							audience: process.env.REACT_APP_AUTH0_AUDIENCE,
						});

						const response = await axios.post(
							`${process.env.REACT_APP_SERVER}/add-item/${id}`,
							data,
							{
								headers: {
									Authorization: `Bearer ${accessToken}`,
								},
							}
						);
						resetForm();
						navigate(`/view-collection/${id}`);
					} catch (error: any) {
						setError(error);
					}
					setIsLoading(false);
				}}
				initialValues={initialValues}
			>
				{({ handleSubmit, handleChange, values }) => (
					<Form
						noValidate
						onSubmit={handleSubmit}
						className="mx-auto mt-5 "
						style={{
							width: '900px',
							maxWidth: '100%',
						}}
					>
						<Form.Group
							className="mb-3"
							style={{ color: 'var(--text-constant)' }}
						>
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
										value={values[f.name] || ''}
										addonText="-"
										addonOnClick={deleteField.bind(null, f.name)}
									/>
								);
							}
							if (f.type === 'radio') {
								return (
									<Form.Group key={i}>
										<BButon variant="outline-secondary" style ={{marginRight:'3px'}}onClick={deleteField.bind(null, f.name)}>-</BButon>
										<Form.Label>{f.label}</Form.Label>
										<Field
											component={Radio}
											label={`${t('yes')}`}
											value="true"
											name={f.name}
											onChange={handleChange}
										/>
										<Field
											component={Radio}
											label={`${t('no')}`}
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
									value={values[f.name] || ''}
									addonText={f.name !== 'name' ? '-' : ''}
									addonOnClick={deleteField.bind(null, f.name)}
								/>
							);
						})}
						<div className="text-center">
							<Button className="button--alt" type="button" onClick={showModal}>
								{t('add_field')}
							</Button>
						</div>
						<div className="my-4 text-center">
							<Button type="submit" className="button">
								{isLoading ? `${t('sending')}...` : `${t('add_item')}`}
							</Button>
						</div>
						{error && (
							<p className="text-danger">
								{error.message ||
									error.response?.data?.msg ||
									'Sorry, something went wrong!'}
							</p>
						)}
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

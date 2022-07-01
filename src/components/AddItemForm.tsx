import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button as BButon } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import Button from '../UI/Button';
import { useState, useRef, useEffect } from 'react';
import Radio from '../UI/FormFields/Radio';
import Textarea from '../UI/FormFields/Textarea';
import YupSchemaGenerator from '../utils/YupSchemaGenerator';
import CreateFieldModal from './CreateFieldModal';
import { v4 as uuid } from 'uuid';
import Autocomplete, { TagsType } from '../UI/FormFields/Autocomplete';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { useAddItem, useEditItem } from '../services/CollectionServices';
import { CollectionItem } from '../ts/types';
type initialValuesType = {
	[key: string]: string;
};
interface FormDataInterface {
	[key: string]: { value: string; label: string; type: string };
}

interface FormFieldInterface {
	name: string;
	label: string;
	type: string;
	value: any;
	validationType: string;
	validation: {
		type: string;
		params: string;
	};
}

const AddItemForm: React.FC<{
	item?: CollectionItem;
}> = ({ item }) => {
	const tagsRef = useRef<any>();
	const { t } = useTranslation();
	const { user } = useAuth0();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { error, isLoading, postItem } = useAddItem();
	const { sendEditRequest, isEditing, editError } = useEditItem();
	const [formFields, setFormFields] = useState<FormFieldInterface[]>([
		{
			name: 'name',
			label: `${t('item_name')}:`,
			type: 'text',
			value: '',
			validationType: 'string',
			validation: { type: 'required', params: `${t('field_required')}` },
		},
	]);

	useEffect(() => {
		if (item) {
			let itemsData: FormFieldInterface[] = [];
			for (let [key, value] of Object.entries(item)) {
				if (
					!['author', '_id', 'tags', 'comments', 'likes', 'date'].includes(key)
				) {
					let validationType = value.type;
					if (
						value.type === 'text' ||
						value.type === 'textarea' ||
						value.type === 'radio'
					) {
						validationType = 'string';
					}
					const values = {
						name: key,
						label: value.label,
						type: value.type,
						value: value.value,
						validationType,
						validation: { type: 'required', params: `${t('field_required')}` },
					};
					itemsData.push(values);
				}
			}

			setFormFields(itemsData);
		}
	}, []);

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
			value: '',
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
		initialValues[item.name] = item.value;
	});

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					const tags = tagsRef.current.getTags().map((t: TagsType) => t.value);
					let formData: FormDataInterface = {};

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

					if (item) {
						sendEditRequest(item._id, data);
						return;
					}
					postItem(data);
				}}
				initialValues={initialValues}
				enableReinitialize={!!item}
			>
				{({ handleSubmit, handleChange, values, initialValues }) => (
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
							<Autocomplete ref={tagsRef} preselected={item?.tags} />
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
										addontext="-"
										addononclick={deleteField.bind(null, f.name)}
									/>
								);
							}
							if (f.type === 'radio') {
								return (
									<Form.Group key={i}>
										<BButon
											variant="outline-secondary"
											style={{ marginRight: '3px' }}
											onClick={deleteField.bind(null, f.name)}
										>
											-
										</BButon>
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
									label={
										f.name !== 'name' ? `${f.label}:` : `${t('item_name')}:`
									}
									type={f.type}
									name={f.name}
									component={TextFormField}
									value={values[f.name] || ''}
									addontext={f.name !== 'name' ? '-' : ''}
									addononclick={deleteField.bind(null, f.name)}
								/>
							);
						})}
						<div className="text-center">
							<Button className="button--alt" type="button" onClick={showModal}>
								{item ? t('confirm') : t('add_field')}
							</Button>
						</div>
						<div className="my-4 text-center">
							<Button type="submit" className="button">
								{isLoading || isEditing
									? `${t('sending')}...`
									: `${t('add_item')}`}
							</Button>
						</div>
						{error && (
							<p className="text-danger">
								{error || editError || 'Sorry, something went wrong!'}
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

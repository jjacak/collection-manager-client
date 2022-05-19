import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import SelectFormField from '../UI/FormFields/SelectFormField';
import Button from '../UI/Button';
import { MultiSelect } from 'react-multi-select-component';
import { useState } from 'react';
import classes from './AddCollection.module.css';
import { useTranslation } from 'react-i18next';


const tagsOptions = [
	{ label: 'wine', value: 'wine' },
	{ label: 'fantasy', value: 'fantasy' },
	{ label: '2000', value: '2000' },
];
const AddCollection = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const { t } = useTranslation();

	const schema = yup.object().shape({
		title: yup.string().required(`${t("field_required")}`),
		topic: yup.string().required(`${t("field_required")}`),
		description: yup.string().required(`${t("field_required")}`),
	});

	return (
		<section>
			<h1 className="text-center">{t("create_collection")}</h1>

			<Formik
				validationSchema={schema}
				onSubmit={(val) => {
					console.log(selectedTags);
					console.log(val);
					console.log(uploadedImage);
				}}
				initialValues={{
					title: '',
					topic: '',
					description: '',
				}}
			>
				{({ handleSubmit }) => (
					<Form
						className="mx-auto mt-5 "
						style={{
							width: '900px',
							maxWidth: '100%',
						}}
						noValidate
						onSubmit={handleSubmit}
					>
						<Field
							label={t("title")}
							name="title"
							component={TextFormField}
						/>
						<Field
							label={t("topic")}
							name="topic"
							options={[
								{ label: `${t("coins")}`, value: 'coins' },
								{ label: `${t("alcohols")}`, value: 'alcohols' },
								{ label: `${t("books")}`, value: 'books' },
								{ label: `${t("music_albums")}`, value: 'music-albums' },
							]}
							component={SelectFormField}
						/>
						<Field
							label={t("description")}
							name="description"
							istextarea="true"
							rows={4}
							component={TextFormField}
						/>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="autocomplete">{t("tags")}</Form.Label>
							<MultiSelect
								className={classes.autocomplete}
								options={tagsOptions}
								value={selectedTags}
								onChange={setSelectedTags}
								labelledBy="Select"
								isCreatable
								hasSelectAll={false}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="image">{t("image")}</Form.Label>
							<Form.Control
								id="image"
								name="image"
								type="file"
								onChange={(event: any) =>
									setUploadedImage(event.target.files[0])
								}
								data-browse="Your custom label"
							/>
						</Form.Group>
						<div className="mt-3 d-flex justify-content-center justify-content-sm-end">
							<Button type="submit" className="button">
								{t("create_collection")}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default AddCollection;

import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import SelectFormField from '../UI/FormFields/SelectFormField';
import Button from '../UI/Button';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import Textarea from '../UI/FormFields/Textarea';
import Autocomplete, { TagsType } from '../UI/FormFields/Autocomplete';
import { useCreateCollection } from '../services/CollectionServices';

const AddCollectionForm = () => {
	const tagsRef = useRef<any>();
	const [uploadedImage, setUploadedImage] = useState<any>(null);
	const { t } = useTranslation();
	const { user} = useAuth0();
	const { error, isLoading, postColection } = useCreateCollection();

	const schema = yup.object().shape({
		title: yup.string().required(`${t('field_required')}`),
		topic: yup.string().required(`${t('field_required')}`),
		description: yup.string().required(`${t('field_required')}`),
	});

	return (

			<Formik
				validationSchema={schema}
				onSubmit={async (val) => {

					const tags = tagsRef.current.getTags().map((t: TagsType) => t.value);
					const data = {
						...val,
						tags: JSON.stringify(tags),
						image: uploadedImage,
						owner_id: user!.sub,
						owner_name: user!.nickname,
					};

					const formData = new FormData();
					for (const key of Object.keys(data)) {
						if (data[key as keyof typeof data]) {
							formData.append(key, data[key as keyof typeof data]);
						}
					}
					postColection(formData);
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
						<Field label={t('title')} name="title" component={TextFormField} />
						<Field
							label={t('topic')}
							name="topic"
							options={[
								{ label: `${t('coins')}`, value: 'coins' },
								{ label: `${t('alcohols')}`, value: 'alcohols' },
								{ label: `${t('books')}`, value: 'books' },
								{ label: `${t('music_albums')}`, value: 'music-albums' },
							]}
							component={SelectFormField}
						/>
						<Field
							label={t('description')}
							name="description"
							rows={4}
							component={Textarea}
						/>

						<Form.Group
							className="mb-3"
							style={{ color: 'var(--text-constant)' }}
						>
							<Form.Label htmlFor="autocomplete">{t('tags')}</Form.Label>
							<Autocomplete ref={tagsRef} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="image">{t('image')}</Form.Label>
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
								{isLoading ? `${t('sending')}...` : `${t('create_collection')}`}
							</Button>
						</div>
						{error && (
							<p className="text-danger">
								{error||'Sorry, something went wrong!'}
							</p>
						)}
					</Form>
				)}
			</Formik>
	);
};

export default AddCollectionForm;

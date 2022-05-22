import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import TextFormField from '../UI/FormFields/TextFormField';
import SelectFormField from '../UI/FormFields/SelectFormField';
import Button from '../UI/Button';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Textarea from '../UI/FormFields/Textarea';
import Autocomplete, {TagsType} from '../UI/FormFields/Autocomplete';

const AddCollection = () => {
	const tagsRef = useRef<any>();
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any|null>(null);
	const { t } = useTranslation();
	const { user, getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();

	const schema = yup.object().shape({
		title: yup.string().required(`${t('field_required')}`),
		topic: yup.string().required(`${t('field_required')}`),
		description: yup.string().required(`${t('field_required')}`),
	});

	return (
		<section>
			<h1 className="text-center mb-4 bg-warning">{t('create_collection')}</h1>

			<Formik
				validationSchema={schema}
				onSubmit={async (val) => {
					try {
						setIsLoading(true);
						setError(null);
						const tags = tagsRef.current.getTags().map((t:TagsType) => t.value);
						const data = {
							...val,
							tags: JSON.stringify(tags),
							image: uploadedImage,
							owner_id: user!.sub,
							owner_name:user!.nickname
						};
						console.log(data);
						const accessToken = await getAccessTokenSilently({
							audience: process.env.REACT_APP_AUTH0_AUDIENCE,
						});
						const res = await axios.post(
							`${process.env.REACT_APP_SERVER}/create-collection`,
							data,
							{
								headers: {
									Authorization: `Bearer ${accessToken}`,
									'Content-Type': 'multipart/form-data',
								},
							}
						);
						console.log('response:', res);
						navigate('/profile');
					} catch (error) {
						setError(error)
					}
					setIsLoading(false);
					
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

						<Form.Group className="mb-3" style={{color:'var(--text-constant)'}}>
							<Form.Label htmlFor="autocomplete">{t('tags')}</Form.Label>
							<Autocomplete ref={tagsRef}/>
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
						{error && <p className='text-danger'>{error?.response?.data?.msg || 'Sorry, something went wrong!'}</p>}
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default AddCollection;

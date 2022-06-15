import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { useCreateCollection } from '../services/CollectionServices';
import AddCollectionForm from '../components/AddCollectionForm';

const AddCollection = () => {
	const { t } = useTranslation();

	return (
		<section>
			<h1 className="text-center mb-4 bg-warning">{t('create_collection')}</h1>
			<AddCollectionForm />
		</section>
	);
};

export default AddCollection;

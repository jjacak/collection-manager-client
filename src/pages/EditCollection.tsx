import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddCollectionForm from '../components/AddCollectionForm';
import { useGetCollection } from '../services/CollectionServices';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const EditCollection = () => {
	const { t } = useTranslation();
	const { collection, didFetchCollection, requestCollection } =
		useGetCollection();
	const { user, isLoading } = useAuth0();

	const isOwner = user?.sub === collection?.owner_id;
	const isAdmin =
		user?.['http:/collection-manager-app.com/roles']?.includes('admin');
	const isAuthorized = isOwner || isAdmin;

	useEffect(() => {
		requestCollection();
	}, [requestCollection]);
	console.log(collection);

	if (didFetchCollection && !collection) {
		return <Navigate to="/404" />;
	}
    if(!isAuthorized && !isLoading){
		return <Navigate to="/" />;

    }

	return (
		<section>
			{didFetchCollection && collection && (
				<div>
					<h1 className="text-center mb-4 bg-warning">
						{t('edit_collection')}
					</h1>
					<AddCollectionForm
						editedCollectionValues={{
							title: collection.title,
							topic: collection.topic,
							description: collection.description,
							tags: collection.tags,
							id: collection._id,
						}}
					/>
				</div>
			)}
		</section>
	);
};

export default EditCollection;

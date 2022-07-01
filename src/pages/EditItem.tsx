import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCollection } from '../services/CollectionServices';
import { Navigate } from 'react-router-dom';
import { CollectionItem } from '../ts/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams} from 'react-router-dom';
import AddItemForm from '../components/AddItemForm';

const EditItem = () => {
	const { t } = useTranslation();
	const { collection, didFetchCollection, requestCollection } =
		useGetCollection();
	const { user, isLoading } = useAuth0();
	const { id } = useParams();

	const item: CollectionItem | undefined = collection?.items?.filter(
		(i) => i._id === id
	)[0];

	const isOwner = user?.sub === collection?.owner_id;
	const isAdmin =
		user?.['http:/collection-manager-app.com/roles']?.includes('admin');
	const isAuthorized = isOwner || isAdmin;

	useEffect(() => {
		requestCollection();
	}, [requestCollection]);

	if (didFetchCollection && !collection) {
		return <Navigate to="/404" />;
	}
	if (!isAuthorized && !isLoading) {
		return <Navigate to="/" />;
	}

	return (
		<section>
			{didFetchCollection && collection && item && (
				<div>
					<h1>{t('edit_item')}</h1>
					<AddItemForm
						item={item}
					/>
				</div>
			)}
		</section>
	);
};

export default EditItem;

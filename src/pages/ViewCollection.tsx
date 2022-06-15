import { NavLink } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CollectionTable from '../components/CollectionTable';
import { useAuth0 } from '@auth0/auth0-react';
import {
	useGetCollection,
	useDeleteCollection,
	useDeleteItem,
} from '../services/CollectionServices';

const ViewCollection = () => {
	const { id } = useParams();
	const { sendDeleteCollectionRequest } = useDeleteCollection();
	const { sendDeleteItemRequest } = useDeleteItem();
	const { collection, didFetchCollection, requestCollection } =
		useGetCollection();
	const { t } = useTranslation();
	const { user } = useAuth0();

	const isOwner = user?.sub === collection?.owner_id;
	const isAdmin =
		user?.['http:/collection-manager-app.com/roles']?.includes('admin');
	const isAuthorized = isOwner || isAdmin;

	useEffect(() => {
		requestCollection();
	}, [requestCollection]);

	const deleteItem = async (itemID: string) => {
		await sendDeleteItemRequest(itemID);
		requestCollection();
	};

	const tableData = collection?.items?.map((i) => {
		return {
			_id: i._id,
			name: i.name.value,
			date: i.date.toString().slice(0, 10),
		};
	});
	if (didFetchCollection && !collection) {
		return <Navigate to="/404" />;
	}
	return (
		<>
			<section>
				<h1 className="text-center mb-4 bg-warning">
					{t('collection')}: {collection?.title}
				</h1>
				{isAuthorized && (
					<div className="text-center mb-4">
						<NavLink
							className="btn"
							style={{
								backgroundColor: 'var(--accent)',
								color: 'var(--text-primary',
								marginRight: '3px',
							}}
							to={`/add-item/${id}`}
						>
							{t('add_item')}
						</NavLink>
						<NavLink
							className="btn"
							style={{
								borderColor: 'var(--accent)',
								color: 'var(--text-primary',
								marginRight: '3px',
							}}
							to={`/edit-collection/${id}`}
						>
							{t('edit')}
						</NavLink>
						<Button
							className="btn-danger"
							onClick={sendDeleteCollectionRequest}
						>
							{t('delete')}
						</Button>
					</div>
				)}
				{collection?.image && (
					<img
						src={collection?.image}
						className="img-fluid d-block rounded mx-auto mb-4"
						alt="Collection cover"
					/>
				)}
				<p className="fs-4">
					<span className="fw-bold">{t('author')}: </span>
					{collection?.owner_name}
				</p>
				<p className="fs-4">
					<span className="fw-bold">{t('category')}: </span>
					{collection?.topic}
				</p>
				<p className="fs-4">
					<span className="fw-bold">{t('description')}: </span>
					{collection?.description}
				</p>

				<p>
					{collection?.tags?.map((t, i) => {
						return (
							<Badge
								bg="warning"
								style={{ marginRight: '3px', cursor: 'pointer' }}
								key={i}
							>
								{t}
							</Badge>
						);
					})}
				</p>

				{!collection?.items?.length && (
					<p className="text-center">{t('no_items')}</p>
				)}
				{tableData && tableData.length > 0 && (
					<CollectionTable
						items={tableData}
						isAuthorized={isAuthorized}
						onDelete={deleteItem}
					/>
				)}
			</section>
		</>
	);
};

export default ViewCollection;

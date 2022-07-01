import { NavLink } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CollectionTable from '../components/CollectionTable';
import defaultImage from '../img/default-img.png';
import classes from './ViewCollection.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import {
	useGetCollection,
	useDeleteCollection,
	useDeleteItem,
	useDeleteImage,
} from '../services/CollectionServices';
import { TrashIcon, PencilIcon, PlusIcon } from '@primer/octicons-react';
import EditImageModal from '../components/EditImageModal';

const ViewCollection = () => {
	const { id } = useParams();
	const { sendDeleteCollectionRequest } = useDeleteCollection();
	const { sendDeleteItemRequest } = useDeleteItem();
	const { collection, didFetchCollection, requestCollection, error } =
		useGetCollection();
	const { sendDeleteImageRequest } = useDeleteImage();
	const { t } = useTranslation();
	const { user } = useAuth0();
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const deleteImage = async () => {
		await sendDeleteImageRequest(id!);
		requestCollection();
	};
	const closeModal = () => {
		setIsModalOpen(false);
		requestCollection();
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const tableData = collection?.items?.map((i) => {
		return {
			_id: i._id,
			name: i.name.value,
			date: i.date.toString().slice(0, 10),
		};
	});

	if (didFetchCollection && !collection && !error) {
		return <Navigate to="/404" />;
	}
	if (didFetchCollection && error) {
		return error;
	}
	if (!didFetchCollection) {
		return <p>{t('loading')}...</p>;
	}
	return (
		<>
			<section>
				<h1>
					{t('collection')}: {collection?.title}
				</h1>
				{isAuthorized && (
					<div className="text-center mb-4">
						<NavLink
							className="btn"
							style={{
								backgroundColor: 'var(--accent)',
								marginRight: '3px',
							}}
							to={`/add-item/${id}`}
						>
							<PlusIcon/>
						</NavLink>
						<NavLink
							className="btn btn-secondary"
							style={{
								marginRight: '3px',
							}}
							to={`/edit-collection/${id}`}
						>
							<PencilIcon/>
						</NavLink>
						<Button className='btn-danger'
							
							onClick={sendDeleteCollectionRequest}
						>
							<TrashIcon />
						</Button>
					</div>
				)}
				<div className={classes['cover-image']}>
					<img src={collection?.image || defaultImage} alt="Collection cover" />
					{isAuthorized && (
						<div className={classes['image-options']}>
							<button onClick={showModal}>
								<PencilIcon />
							</button>
							{collection?.image && (
								<button onClick={deleteImage}>
									<TrashIcon />
								</button>
							)}
						</div>
					)}
				</div>

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

				{collection && !collection.items?.length && (
					<p className="text-center">{t('no_items')}</p>
				)}
				{tableData && tableData.length > 0 && (
					<CollectionTable
						items={tableData}
						isAuthorized={isAuthorized}
						onDelete={deleteItem}
					/>
				)}
				{isModalOpen && collection && (
					<EditImageModal
						onClose={closeModal}
						show={isModalOpen}
						id={collection._id}
						cloudinary_id={collection.cloudinary_id}
					/>
				)}
			</section>
		</>
	);
};

export default ViewCollection;

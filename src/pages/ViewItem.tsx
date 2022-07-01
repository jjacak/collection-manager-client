import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CollectionItem } from '../ts/types';
import { Button, Badge } from 'react-bootstrap';
import { useDeleteItem } from '../services/CollectionServices';
import { useGetCollection } from '../services/CollectionServices';
import { TrashIcon, PencilIcon } from '@primer/octicons-react';

const ViewItem = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { collection, requestCollection } = useGetCollection();
	const { t } = useTranslation();
	const { user } = useAuth0();
	const { sendDeleteItemRequest } = useDeleteItem();
	const item: CollectionItem | undefined = collection?.items?.filter(
		(i) => i._id === id
	)[0];
	const isOwner = user?.sub === collection?.owner_id;
	const isAdmin =
		user?.['http:/collection-manager-app.com/roles']?.includes('admin');
	const isAuthorized = isOwner || isAdmin;
	
	useEffect(() => {
		requestCollection();
	}, [id]);

	const deleteItem = async () => {
		if (!id) {
			return;
		}
		await sendDeleteItemRequest(id);
		navigate(-1);
	};
	const itemAttributes = item ? Object.entries(item) : [];
	const itemValues = (
		<div>
			{itemAttributes.map((i) => {
				if (
					[
						'name',
						'tags',
						'date',
						'author',
						'_id',
						'likes',
						'comments',
					].includes(i[0])
				) {
					return;
				}
				return (
					<p className="fs-4" key={i[0]}>
						<span className="fw-bold">{i[1].label}: </span>
						{i[1].value}
					</p>
				);
			})}
		</div>
	);

	return (
		<section>
			<h1>
				{t('item')}: {item?.name.value}
			</h1>

			<div className="text-center mb-4">
				<NavLink
					className="btn border-secondary"
					style={{ marginRight: '3px', color: 'var(--text-primary)' }}
					to={`/view-collection/${collection?._id}`}
				>
					{t('return')}
				</NavLink>
				{isAuthorized && (
					<>
						<NavLink
							className="btn btn-secondary"
							style={{
								marginRight: '3px',
							}}
							to={`/edit-item/${id}`}
						>
							<PencilIcon />
						</NavLink>
						<Button className="btn-danger" onClick={deleteItem}>
							<TrashIcon />
						</Button>
					</>
				)}
			</div>
			<article>
			<p>
					{item?.tags?.map((t, i) => {
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
				<p className="fs-4">
					<span className="fw-bold">{t('author')}: </span>
					{collection?.owner_name}
				</p>
				<p className="fs-4">
					<span className="fw-bold">{t('category')}: </span>
					{collection?.topic}
				</p>
				<p className="fs-4">
					<span className="fw-bold">{t('name')}: </span>
					{item?.name.value}
				</p>
				{itemValues}
			</article>
		</section>
	);
};

export default ViewItem;

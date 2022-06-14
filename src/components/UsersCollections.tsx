import {useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import CollectionCard from './CollectionCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUsersCollections } from '../services/CollectionServices';

const UsersCollections: React.FC<{ id: string }> = (props) => {
	const { collections, error, requestCollections } = useGetUsersCollections();
	const { t } = useTranslation();
	const { user } = useAuth0();

	const isAuthorized = user?.sub === props.id;

	useEffect(() => {
		
		requestCollections(props.id)

	}, [requestCollections]);
	return (
		<article>
			<h2 className="my-4 text-center">{t('users_collections')}:</h2>
			{error && <p className="text-danger">{error.message}</p>}
			{!collections.length && (
				<p className="text-center">{t('no_collections')}</p>
			)}
			{isAuthorized && (
				<div className="d-flex justify-content-center">
					<NavLink
						className="btn"
						style={{
							background: 'var(--accent)',
							color: 'var(--text-primary)',
						}}
						to="/add-collection"
					>
						{t('add_collection')}
					</NavLink>
				</div>
			)}
			<div className="row justify-content-center mt-3">
				{collections.map((c) => {
					return <CollectionCard key={c['_id']} collection={c} />;
				})}
			</div>
		</article>
	);
};
export default UsersCollections;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const UsersCollections = () => {
	const [collections, setCollections] = useState(null);
	const { t } = useTranslation();

	return (
		<article>
			<h2 className="my-4 text-center">{t('users_collections')}:</h2>
			{!collections && <p className="text-center">{t('no_collections')}</p>}
			<div className="d-flex justify-content-center">
				{window.location.pathname === '/profile' && (
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
				)}
			</div>
		</article>
	);
};
export default UsersCollections;

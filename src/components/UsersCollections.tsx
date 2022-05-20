import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CollectionCard from './CollectionCard';

const UsersCollections: React.FC<{ id: string }> = (props) => {
	const [collections, setCollections] = useState([]);
	const [error, setError] = useState<any|null>(null);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER}/get-collections/${props.id}`
				);
				setCollections(response.data);
			} catch (error) {
				setError(error)
			}
		};
		fetchCollections();
	}, []);
	return (
		<article>
			<h2 className="my-4 text-center">{t('users_collections')}:</h2>
            {error && <p className='text-danger'>{error.message}</p>}
			{!collections.length && <p className="text-center">{t('no_collections')}</p>}
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
            <div className='row justify-content-center mt-3'>
                    {collections.map(c=>{
                            return <CollectionCard key={c['_id']} collection={c}/>
                        })}
                    </div>
		</article>
	);
};
export default UsersCollections;

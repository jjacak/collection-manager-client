import { useTranslation } from 'react-i18next';
import { useState,useEffect } from 'react';
import axios from 'axios';
import CollectionCard from '../components/CollectionCard';

const Dashboard = () => {
	const { t } = useTranslation();
	const [collections, setCollections]= useState([])

	useEffect(()=>{
		const fetchCollections = async () => {
			
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER}/get-largest-collections`
				);
				setCollections(response.data);
		
		};
		fetchCollections();
	}, [])
	return (
		<section>
			<h2  className='mb-4'>{t("browse_largest")}</h2>
			<div className="row justify-content-center mt-3">
				{collections.map((c) => {
					return <CollectionCard key={c['_id']} collection={c} />;
				})}
			</div>
		</section>
	);
};

export default Dashboard;

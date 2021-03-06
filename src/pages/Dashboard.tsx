import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import CollectionCard from '../components/CollectionCard';
import ItemCard from '../components/ItemCard';
import { CollectionItem } from '../ts/types';
import {getLargestCollections, getLatestItems} from '../services/CollectionServices'

type NewestItemType = {
	title: string;
	items: CollectionItem[];
	owner_id: string;
	owner_name: string;
	_id: string;
	tags:string[]
};
const Dashboard = () => {
	const { t } = useTranslation();
	const [collections, setCollections] = useState([]);
	const [items, setItems] = useState<NewestItemType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const [collectionsData, itemsData] = await Promise.all([
			getLargestCollections(), getLatestItems()
			]);
			setCollections(collectionsData.data);
			setItems(itemsData.data);
		};
		fetchData();
	}, []);
	return (
		<>
			<section>
				<h2 className="mb-4">{t('browse_largest')}</h2>
				<div className="row justify-content-center mt-3">
					{collections.map((c) => {
						return <CollectionCard key={c['_id']} collection={c} />;
					})}
				</div>
			</section>
			<section className="mt-4">
				<h2 className="mb-4">{t('browse_recent')}</h2>
				<div className="row justify-content-center mt-3">
					{items.map((e) => {
						const item = {
							collectionTitle: e.title,
							ownerName: e.owner_name,
							collectionId: e._id,
							itemName: e.items[0].name.value,
							itemId:e.items[0]._id,
							tags:e.items[0].tags
						};
						return <ItemCard key={e._id} item={item} />;
					})}
				</div>
			</section>
		</>
	);
};

export default Dashboard;

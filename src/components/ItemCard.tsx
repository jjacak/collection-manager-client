import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ItemProps = {
	collectionTitle: string;
	ownerName: string;
	collectionId: string;
	itemName: string;
};
const ItemCard: React.FC<{ item: ItemProps }> = (props) => {
	const { t } = useTranslation();

	return (
		<Card
			className="m-2 p-0"
			style={{
				width: '250px',
				backgroundColor: 'var(--background)',
				borderColor: ' var(--card-border)',
			}}
		>
			<Card.Body>
				<Card.Title>{props.item.itemName}</Card.Title>
				<Card.Text>
					<span className="fw-bold">{t('title')}: </span>
					{props.item.collectionTitle}
				</Card.Text>
				<Card.Text>
					<span className="fw-bold">{t('author')}: </span>
					{props.item.ownerName}
				</Card.Text>
				<NavLink
					to={`/view-collection/${props.item.collectionId}`}
					className="btn"
					style={{
						color: 'var(--text-primary)',
						backgroundColor: 'var(--accent)',
					}}
				>
					{t('view_collection')}
				</NavLink>
			</Card.Body>
		</Card>
	);
};
export default ItemCard;

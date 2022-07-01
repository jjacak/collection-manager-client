import { Card, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ItemProps = {
	collectionTitle: string;
	ownerName: string;
	collectionId: string;
	itemName: string;
	itemId:string;
	tags:string[]
};
const ItemCard: React.FC<{ item: ItemProps }> = (props) => {
	const { t } = useTranslation();

	console.log(props.item)
	return (
		<Card
			className="m-2 p-0"
			style={{
				width: '250px',
				backgroundColor: 'var(--background)',
				borderColor: ' var(--card-border)',
			}}
		>
			<Card.Body className="d-flex justify-content-between flex-column ">
				<Card.Title>{props.item.itemName}</Card.Title>
				<Card.Text>
					<span className="fw-bold">{t('title')}: </span>
					{props.item.collectionTitle}
				</Card.Text>
				<Card.Text>
					<span className="fw-bold">{t('author')}: </span>
					{props.item.ownerName}
				</Card.Text>
				<Card.Text>
					{props.item.tags?.map((t, i) => {
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
				</Card.Text>
				<NavLink
					to={`/view-item/${props.item.itemId}`}
					className="btn"
					style={{
						color: 'var(--text-primary)',
						backgroundColor: 'var(--accent)',
					}}
				>
					{t('view_item')}
				</NavLink>
			</Card.Body>
		</Card>
	);
};
export default ItemCard;

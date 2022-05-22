import { Card, Badge, Button as BootstrapButton } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CollectionInterface } from '../ts/types';
import defaultImage from '../img/default-img.png';
import { useTranslation } from 'react-i18next';

const CollectionCard: React.FC<{ collection: CollectionInterface }> = (
	props
) => {
	const { collection } = props;
	const { t } = useTranslation();

	return (
		<Card
			className="m-2 p-0"
			style={{
				width: '220px',
				backgroundColor: 'var(--background)',
				borderColor: ' var(--card-border)',
			}}
		>
			<Card.Img
				variant="top"
				src={collection?.image || defaultImage}
				style={{ height: '120px', objectFit: 'cover' }}
			/>
			<Card.Body className="d-flex justify-content-between flex-column">
				<Card.Title>{collection?.title}</Card.Title>
				<Card.Text>
					<span className="font-weight-bold">{t('category')}:</span>{' '}
					{collection?.topic}
				</Card.Text>
				<Card.Text>
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
				</Card.Text>

				<NavLink
					to={`/view-collection/${collection['_id']}`}
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
export default CollectionCard;

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import ViewUser from '../pages/ViewUser';
import classes from './UserInfo.module.css';
import { User } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const UserInfo: React.FC<{ viewedUser: User | undefined }> = (props) => {
	const { t } = useTranslation();
	return (
		<article className={classes.profile}>
			<h1 className="text-center mb-4 bg-warning">{t("profile")}</h1>
			<img
				className={classes.img}
				src={props.viewedUser?.picture}
				alt={ViewUser!.name}
			/>
			<Card className={classes['profile-card']}>
				<Card.Body>
					<Card.Title className="text-center">
						<h2>{t('account_details')}:</h2>
					</Card.Title>
					<ListGroup className="list-group-flush">
						<ListGroupItem className={classes['list-item']}>
							<p>
								<span className="fw-bold">{t('name')}: </span>
								{props.viewedUser?.nickname}
							</p>
						</ListGroupItem>
						<ListGroupItem className={classes['list-item']}>
							<p>
								<span className="fw-bold">Email: </span>
								{props.viewedUser?.email}
							</p>
						</ListGroupItem>
					</ListGroup>
				</Card.Body>
			</Card>
		</article>
	);
};

export default UserInfo;

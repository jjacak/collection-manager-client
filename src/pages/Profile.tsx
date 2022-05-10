import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import classes from './Profile.module.css';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { t } = useTranslation();
    console.log('profile')

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	if (isAuthenticated) {
		return (
			<Card className={classes['profile-card']}>
				<Card.Img variant="top" src={user!.picture} alt={user!.name} />
				<Card.Body>
					<Card.Title className="text-center">{t("account_details")}:</Card.Title>
					<ListGroup className="list-group-flush">
						<ListGroupItem className={classes['list-item']}>
							<p>
								<span className="fw-bold">{t("name")}: </span>
								{user!.nickname}
							</p>
						</ListGroupItem>
						<ListGroupItem className={classes['list-item']}>
							<p>
								<span className="fw-bold">Email: </span>
								{user!.email}
							</p>
						</ListGroupItem>
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
	return null;
};

export default Profile;

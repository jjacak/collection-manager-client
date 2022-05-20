import { useAuth0, User } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import UsersCollections from '../components/UsersCollections';

const ViewUser: React.FC = () => {
	const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
		useAuth0();
	const { t } = useTranslation();
	const [viewedUser, setViewedUser] = useState<User | undefined>();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	const { userId } = useParams();

	useEffect(() => {
		const getUser = async () => {
			setIsFetching(true);
			setError(null);
			try {
				const accessToken = await getAccessTokenSilently({
					audience: process.env.REACT_APP_AUTH0_AUDIENCE,
				});
				const res = await axios.get(
					`${process.env.REACT_APP_SERVER}/users/${userId}`,
					{
						headers: { Authorization: `Bearer ${accessToken}` },
					}
				);
				setViewedUser(res.data);
			} catch (error: any) {
				setError(error.message || "Unable to fetch user's data.");
			}
			setIsFetching(false);
		};
		getUser();
	}, []);

	if (isLoading || isFetching) {
		return <div>{t("loading")}...</div>;
	}
    if(error){
        return <p>{error}</p>
    }
	if (
		isAuthenticated &&
		user!['http:/collection-manager-app.com/roles'].includes('admin')
	) {
		return (
			<section >
                <UserInfo viewedUser={viewedUser}/>
				<UsersCollections id = {`${viewedUser?.user_id}`}/>
			
			</section>
		);
	}
	return null;
};

export default ViewUser;



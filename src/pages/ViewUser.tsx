import { useAuth0, User } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { NavLink } from 'react-router-dom';

const ViewUser: React.FC = () => {
	const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
		useAuth0();
	const { t } = useTranslation();
	const [viewedUser, setViewedUser] = useState<User | undefined>();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	const [collections, setCollections] = useState(null);

	const { userId } = useParams();

	useEffect(() => {
		if (window.location.pathname === '/profile') {
			setViewedUser(user);
			return;
		}
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
	}, [user]);

	if (isLoading || isFetching) {
		return <div>Loading ...</div>;
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
				<article>
					<h2 className="my-4 text-center">{t("users_collections")}:</h2>
					{!collections && (
						<p className="text-center">
							{t("no_collections")}
						</p>
					)}
					<div className='d-flex justify-content-center'>
					{window.location.pathname === '/profile' && <NavLink className = 'btn' style={{background:"var(--accent)", color:'var(--text-primary)'}} to='/add-collection'>{t("add_collection")}</NavLink>}
					</div>
				</article>
			</section>
		);
	}
	return null;
};

export default ViewUser;

//move collections to separate component


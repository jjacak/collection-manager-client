import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, IdToken } from '@auth0/auth0-react';
import UsersTable from '../components/UsersTable';
import { useAuth0 } from '@auth0/auth0-react';

const AdminPanel = () => {
	const { t } = useTranslation();
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { getAccessTokenSilently } = useAuth0();
	console.log(users);

	const getUsers = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const accessToken = await getAccessTokenSilently({
				audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			});
			const res = await axios.get(`${process.env.REACT_APP_SERVER}/users`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			const usersData = res.data.map((u: User) => {});
			setUsers(res.data);
		} catch (error: any) {
			setError(error?.message || 'Unable to fetch users.');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const deleteUser = async (id: string) => {
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER}/users/${id}/delete`,
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		getUsers();
		return res.data;
	};
	const blockUser = async (id: string, block: boolean) => {
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});
		const res = await axios.patch(
			`${process.env.REACT_APP_SERVER}/users/${id}`,
			{ blocked: block },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		getUsers();
	};
	const updateMetadata = async (id:string, roleName:string[]|null)=>{
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});
		const res = await axios.patch(
			`${process.env.REACT_APP_SERVER}/users/${id}/metadata`,
			{ roles: roleName},
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
	}
	const updateRoles = async (id: string, roles: string[], removeRole:boolean) => {

		const url = removeRole? `${process.env.REACT_APP_SERVER}/users/${id}/deleteroles`:`${process.env.REACT_APP_SERVER}/users/${id}/roles`
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});
		const res = await axios.post(
			url,
			{ roles: roles },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		getUsers();
	};


	return (
		<section>
			<h1 className="text-center">{t('user_management')}</h1>
			{isLoading && <p>Fetching user data...</p>}
			{!isLoading && error && <p>{error}</p>}
			{!isLoading && !error && (
				<UsersTable
					users={users}
					onDeleteUser={deleteUser}
					onBlockUser={blockUser}
					onUpdateRoles = {updateRoles}
					onUpdateMetadata = {updateMetadata}
				/>
			)}
		</section>
	);
};

export default AdminPanel;

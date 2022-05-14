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
	const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
    console.log(user)



	const getUsers = async () => {
		try {
            console.log(123)
			const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              });
            console.log(accessToken)
			const res = await axios.get(`${process.env.REACT_APP_SERVER}/users`, {headers:{Authorization:`Bearer ${accessToken}`
        }});
			const usersData = res.data.map((u: User) => {});
			setUsers(res.data);
		} catch (error: any) {
			setError(error?.message || 'Unable to fetch users.');
		}
	};

	useEffect(() => {

					getUsers();
		
	}, []);

	const deleteUser = async (id: string) => {
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          });
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER}/users/${id}/delete`
		);
		getUsers();
		return res.data;
	};
    

	return (
		<section>
			<h1 className="text-center">{t('user_management')}</h1>
			<UsersTable users={users} onDeleteUser={deleteUser} />
		</section>
	);
};

export default AdminPanel;

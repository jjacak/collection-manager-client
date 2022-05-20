import { useAuth0} from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import UserInfo from '../components/UserInfo';
import UsersCollections from '../components/UsersCollections';

const MyProfile: React.FC = () => {
	const { user, isAuthenticated, isLoading} =
		useAuth0();
	const { t } = useTranslation();

	if (isLoading) {
		return <div>{t("loading")}...</div>;
	}

	if (isAuthenticated) {
		return (
			<section>
				<UserInfo viewedUser={user} />
				<UsersCollections id={`${user?.sub}`}/>
			</section>
		);
	}
	return null;
};

export default MyProfile;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const LoginButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0();
	const {t}=useTranslation();

	return <Button className = 'button--alt' onClick={() => loginWithRedirect()}>{t("log_in")}</Button>;
};

export default LoginButton;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();
	const { t } = useTranslation();
	return (
		<Button
			className="button"
			onClick={() =>
				loginWithRedirect({
					screen_hint: 'signup',
				})
			}
		>
			{t('sign_up')}
		</Button>
	);
};

export default SignupButton;

import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import ThemeSwitch from '../UI/ThemeSwitch';
import classes from './SideNavbar.module.css';
import { useTranslation } from 'react-i18next';
import { ThreeBarsIcon } from '@primer/octicons-react';
import { LinkContainer } from 'react-router-bootstrap';
import AuthenticationButton from '../UI/AuthenthicationButton';
import SignupButton from '../UI/SignupButton';
import { useAuth0 } from '@auth0/auth0-react';

const SideNavbar: React.FC<{ onChangeTheme: () => void; theme: string }> = (
	props
) => {
	const { t } = useTranslation();
	const [navbarCollapsed, setatNavbarCollapsed] = useState<boolean>(true);
	const { isAuthenticated, user } = useAuth0();
	
	const isAdmin =
		user && user['http:/collection-manager-app.com/roles'].includes('admin');

	const toggleNavbar = () => {
		setatNavbarCollapsed((previous) => !previous);
	};
	const toggleClasses = `${classes.toggle} ${
		navbarCollapsed ? '' : classes.expanded
	}`;

	return (
		<aside className={classes['side-navbar']}>
			<button className={toggleClasses} onClick={toggleNavbar}>
				<ThreeBarsIcon />
			</button>
			<ProSidebar
				collapsed={navbarCollapsed}
				collapsedWidth="0px"
				style={{ height: 'calc(100vh - 40px)' }}
			>
				<Menu>
					<MenuItem>
						<ThemeSwitch
							onChangeTheme={props.onChangeTheme}
							theme={props.theme}
						/>
					</MenuItem>
					<MenuItem>
						<AuthenticationButton />
					</MenuItem>
					{!isAuthenticated && (
						<MenuItem>
							<SignupButton />
						</MenuItem>
					)}
					<MenuItem>
						<LinkContainer to="/">
							<p>{t('dashboard')}</p>
						</LinkContainer>
					</MenuItem>
					{isAuthenticated && (
						<MenuItem>
							<LinkContainer to="profile">
								<p>{t('my_account')}</p>
							</LinkContainer>
						</MenuItem>
					)}
					{isAuthenticated && isAdmin&& (
						<MenuItem>
							<LinkContainer to="admin">
								<p>Admin</p>
							</LinkContainer>
						</MenuItem>
					)}
				</Menu>
			</ProSidebar>
		</aside>
	);
};
export default SideNavbar;

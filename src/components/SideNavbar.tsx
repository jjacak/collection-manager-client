import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import ThemeSwitch from '../UI/ThemeSwitch';
import classes from './SideNavbar.module.css';
import { useTranslation } from 'react-i18next';
import { ThreeBarsIcon } from '@primer/octicons-react';
import { LinkContainer } from 'react-router-bootstrap';

const SideNavbar: React.FC<{ onChangeTheme: () => void; theme: string }> = (
	props
) => {
	const { t } = useTranslation();
	const [navbarCollapsed, setatNavbarCollapsed] = useState<boolean>(true);

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
						<LinkContainer to="/"><p>{t('dashboard')}</p></LinkContainer>
					</MenuItem>
					<MenuItem>
						<LinkContainer to="account-details"><p>{t('my_account')}</p></LinkContainer>
					</MenuItem>
				</Menu>
			</ProSidebar>
		</aside>
	);
};
export default SideNavbar;

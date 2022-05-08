import React, { Suspense } from 'react';
import './App.css';
import useLocalStorage from 'use-local-storage';
import './i18n';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import { Outlet } from 'react-router-dom';

function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);
	const changeThemeHandler = () => {
		const newTheme: string = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	return (
		<div className="App" data-theme={theme}>
			<Suspense fallback={null}>
				<TopNavbar />
	
					<SideNavbar onChangeTheme={changeThemeHandler} theme={theme} />
					<Outlet />
			
			</Suspense>
		</div>
	);
}

export default App;

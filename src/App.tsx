import React, { Suspense } from 'react';
import './App.css';
import useLocalStorage from 'use-local-storage';
import './i18n';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import { Outlet, Route, Routes } from 'react-router-dom';
import Content from './UI/Content';
import { ProtectedRoute } from './auth/protected-route';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

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
				<Content>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route
							path="/profile"
							element={<ProtectedRoute component={Profile} />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Content>
			</Suspense>
		</div>
	);
}

export default App;

import React, { Suspense, useContext } from 'react';
import './App.css';
import './i18n';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import { Route, Routes } from 'react-router-dom';
import Content from './UI/Content';
import { RoleProtectedRoute } from './auth/role-protected-route';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import { ThemeContext } from './store/theme-context';

function App() {
	const themeContext = useContext(ThemeContext);
	return (
		<div className="App" data-theme={themeContext.theme}>
			<Suspense fallback={null}>
				<TopNavbar />
				<SideNavbar
					onChangeTheme={themeContext.switchTheme}
					theme={themeContext.theme}
				/>
				<Content>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route
							path="/profile"
							element={<RoleProtectedRoute component={Profile} />}
						/>
						<Route
							path="admin"
							element={
								<RoleProtectedRoute role="admin" component={AdminPanel} />
							}
						/>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Content>
			</Suspense>
		</div>
	);
}

export default App;

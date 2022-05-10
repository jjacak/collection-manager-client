import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sideNavbarVariables.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import NotFound from './pages/NotFound';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './pages/Profile';
import { ProtectedRoute } from './auth/protected-route';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Router>
		<Auth0Provider
			domain="dev-chzjoknr.us.auth0.com"
			clientId="Qa98UmqzTKcgW2D9PkwqmygJhOHoAjbg"
			redirectUri={window.location.origin}
		>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Content />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/profile" element={<ProtectedRoute component={Profile}/>} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Auth0Provider>
	</Router>
);

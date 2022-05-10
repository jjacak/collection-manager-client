import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sideNavbarVariables.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Router>
		<Auth0ProviderWithHistory>
			<App />
		</Auth0ProviderWithHistory>
	</Router>
);

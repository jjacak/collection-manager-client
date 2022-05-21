import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sideNavbarVariables.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import ThemeContextProvider from './store/theme-context';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Router>
		<Auth0ProviderWithHistory>
			<ThemeContextProvider>
      <App />
      </ThemeContextProvider>
		</Auth0ProviderWithHistory>
	</Router>
);

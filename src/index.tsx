import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sideNavbarVariables.scss';
import { BrowserRouter as Router} from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import ThemeContextProvider from './store/theme-context';
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Router>
		<ScrollToTop>
		<Auth0ProviderWithHistory>
			<ThemeContextProvider>
      <App />
      </ThemeContextProvider>
		</Auth0ProviderWithHistory>
		</ScrollToTop>
	</Router>
);

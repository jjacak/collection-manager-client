import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sideNavbarVariables.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
		<Routes>
      <Route path='/' element={<App/>}>
        <Route path='/' element={<Content/>}>
        <Route path='/' element={<Dashboard/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
       
    </Routes>
		</Router>
	</React.StrictMode>
);

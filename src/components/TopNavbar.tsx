import { Navbar, Container } from 'react-bootstrap';
import { FileDirectoryIcon } from '@primer/octicons-react';
import SwitchLanguage from '../UI/SwitchLanguage';


const TopNavbar: React.FC = () => {
	return (
		<Navbar style={{ backgroundColor: 'var(--components-background)' , position:'fixed', top:'0', left:'0', right:'0', zIndex:'2000'}}>
			<Container>
				<Navbar.Brand href="#home" style={{ color: 'var(--text-primary)' }}>
					<FileDirectoryIcon size={24} /> MyCollection
				</Navbar.Brand>
				<SwitchLanguage />
			</Container>
		</Navbar>
	);
};

export default TopNavbar;
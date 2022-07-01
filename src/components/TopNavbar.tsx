import { Navbar, Container } from 'react-bootstrap';
import { FileDirectoryIcon } from '@primer/octicons-react';
import SwitchLanguage from '../UI/SwitchLanguage';
import { LinkContainer } from 'react-router-bootstrap';

const TopNavbar: React.FC = () => {
	return (
		<Navbar style={{ backgroundColor: 'var(--components-background)' , position:'fixed', top:'0', left:'0', right:'0', zIndex:'2000'}}>
			<Container>
				<LinkContainer to="/" style={{ color: 'var(--text-primary)' }}>
					<div><FileDirectoryIcon size={24} /> MyCollection</div>
				</LinkContainer>
				<SwitchLanguage />
			</Container>
		</Navbar>
	);
};

export default TopNavbar;

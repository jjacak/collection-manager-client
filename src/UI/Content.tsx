import { Outlet } from 'react-router-dom';
import classes from './Content.module.css';
import { Container } from 'react-bootstrap';
type contentProps = {
	children: React.ReactNode;
};
const Content: React.FC<contentProps> = (props) => {
	return (
		<main className={classes.content}>
			<Container>{props.children}</Container>
		</main>
	);
};
export default Content;

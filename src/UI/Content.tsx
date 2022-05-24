import classes from './Content.module.css';
import { Container } from 'react-bootstrap';
import {propsChildren} from '../ts/types'

const Content: React.FC<propsChildren> = (props) => {
	return (
		<main className={classes.content}>
			<Container>{props.children}</Container>
		</main>
	);
};
export default Content;

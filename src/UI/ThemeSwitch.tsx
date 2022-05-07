import { Form } from 'react-bootstrap';

const ThemeSwitch: React.FC<{ onClick: () => void; theme: string }> = (
	props
) => {
	return (
		<Form>
			<Form.Check
				type="switch"
				id="theme-switch"
				label="Dark theme"
				checked={props.theme === 'dark' ? true : false}
				onClick={props.onClick}
			/>
		</Form>
	);
};

export default ThemeSwitch;

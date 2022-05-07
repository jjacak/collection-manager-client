import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ThemeSwitch: React.FC<{ onClick: () => void; theme: string }> = (
	props
) => {
	const { t } = useTranslation();
	return (
		<Form>
			<Form.Check
				type="switch"
				id="theme-switch"
				label={t('dark_theme')}
				checked={props.theme === 'dark' ? true : false}
				onClick={props.onClick}
			/>
		</Form>
	);
};

export default ThemeSwitch;

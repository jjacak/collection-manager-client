import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


const ThemeSwitch: React.FC<{ onChangeTheme: () => void; theme: string }> = (
	props
) => {
	const defaultCheckedState = props.theme==='dark'?true:false;
	const [checked, setChecked]= useState<boolean>(defaultCheckedState)
	const { t } = useTranslation();

	const switchHandler = ()=>{
		setChecked(previous=>!previous)
	}
	return (
		<Form>
			<Form.Check
				type="switch"
				id="theme-switch"
				label={t('dark_theme')}
				checked={checked}
				onClick={props.onChangeTheme}
				onChange = {switchHandler}
			
			/>
		</Form>
	);
};

export default ThemeSwitch;

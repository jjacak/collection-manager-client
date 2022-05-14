import React from 'react';
import useLocalStorage from 'use-local-storage';
import {propsChildren} from '../ts/types'

type themeContextType = {
	theme: string;
	switchTheme: () => void;
};

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeContext = React.createContext<themeContextType>({
	theme: defaultDark ? 'dark' : 'light',
	switchTheme: () => {},
});
const ThemeContextProvider: React.FC<propsChildren> = (props) => {
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);
	const changeThemeHandler = () => {
		const newTheme: string = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};
	const contextValue = {
		theme: theme,
		switchTheme: changeThemeHandler,
	};

	return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;

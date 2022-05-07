import React from 'react';
import useLocalStorage from 'use-local-storage';
import ThemeSwitch from './UI/ThemeSwitch';
import './App.css'

function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);
  const changeThemeHandler = ()=>{
    const newTheme:string = theme==='light'?'dark':'light';
    setTheme(newTheme)
  }

	return (
		<div className="App" data-theme={theme}>
			<h2 style={{ color: 'var(--accent' }}>hello world</h2>
      <ThemeSwitch onClick ={changeThemeHandler} theme={theme}/>
		</div>
	);
}

export default App;

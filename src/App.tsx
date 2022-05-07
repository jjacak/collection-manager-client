import React,{Suspense} from 'react';
import './App.css'
import useLocalStorage from 'use-local-storage';
import ThemeSwitch from './UI/ThemeSwitch';
import './i18n'
import SwitchLanguage from './UI/SwitchLanguage';

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
      <Suspense fallback={null}>  
			<h2 style={{ color: 'var(--accent' }}>hello world</h2>
      <ThemeSwitch onClick ={changeThemeHandler} theme={theme}/>
      <SwitchLanguage/>
        </Suspense>
		</div>
	);
}

export default App;

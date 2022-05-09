import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	children: React.ReactNode;
    className:string
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			type={props.type||'button'}
			className={`${classes[props.className]}`}
			// className={`${classes.button} ${classes[props.className]}`}
           
		>
			{props.children}
		</button>
	);
};
export default Button;

import { ButtonGroup, Button } from "react-bootstrap";
import i18next from "i18next";
import classes from './SwitchLanguage.module.css'

const SwitchLanguage: React.FC = () => {
	return <ButtonGroup className = {classes['button-group']} aria-label="language switch" size="sm">
    <Button  className = {classes.button} onClick={()=>{i18next.changeLanguage('pl')}}>PL</Button><span className={classes.separator}>|</span>
    <Button className={classes.button} onClick={()=>{i18next.changeLanguage('en')}}>EN</Button>
  </ButtonGroup>
};
export default SwitchLanguage;

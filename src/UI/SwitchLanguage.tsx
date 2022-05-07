import { ButtonGroup, Button } from "react-bootstrap";
import i18next from "i18next";

const SwitchLanguage: React.FC = () => {
	return <ButtonGroup aria-label="language switch" size="sm">
    <Button variant="secondary" onClick={()=>{i18next.changeLanguage('pl')}}>PL</Button>
    <Button variant="secondary" onClick={()=>{i18next.changeLanguage('en')}}>EN</Button>
  </ButtonGroup>
};
export default SwitchLanguage;

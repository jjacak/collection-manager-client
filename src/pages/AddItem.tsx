
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddItemForm from '../components/AddItemForm';



const AddItem = () => {
	const { id } = useParams();
  
	return (
		<section>
			<h1 className='text-center mb-4 bg-warning'>Add Item</h1>
            <AddItemForm/>
           
		</section>
	);
};

export default AddItem;

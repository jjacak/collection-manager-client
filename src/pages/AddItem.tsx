import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AddItemForm from '../components/AddItemForm';

const AddItem = () => {
	const { id } = useParams();
	const { t } = useTranslation();

	return (
		<section>
			<h1 className="text-center mb-4 bg-warning">{t("add_item")}</h1>
			<AddItemForm />
		</section>
	);
};

export default AddItem;

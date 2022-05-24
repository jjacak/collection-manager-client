import { useTranslation } from 'react-i18next';
import AddItemForm from '../components/AddItemForm';

const AddItem = () => {
	const { t } = useTranslation();

	return (
		<section>
			<h1 className="text-center mb-4 bg-warning">{t("add_item")}</h1>
			<AddItemForm />
		</section>
	);
};

export default AddItem;

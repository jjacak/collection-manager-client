import { useTranslation } from 'react-i18next';
import AddCollectionForm from '../components/AddCollectionForm';

const AddCollection = () => {
	const { t } = useTranslation();

	return (
		<section>
			<h1 className="text-center mb-4 bg-warning">{t('create_collection')}</h1>
			<AddCollectionForm />
		</section>
	);
};

export default AddCollection;

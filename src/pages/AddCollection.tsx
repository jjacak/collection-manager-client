import { useTranslation } from 'react-i18next';
import AddCollectionForm from '../components/AddCollectionForm';

const AddCollection = () => {
	const { t } = useTranslation();

	return (
		<section>
			<h1>{t('create_collection')}</h1>
			<AddCollectionForm />
		</section>
	);
};

export default AddCollection;

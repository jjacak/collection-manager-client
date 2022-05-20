import { useParams } from 'react-router-dom';

const ViewCollection = () => {
    const {id} = useParams()
	return <h1>Collection id: {id}</h1>;
};

export default ViewCollection;

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const CollectionTable: React.FC<{ items: any[] }> = (props) => {

	const columns = [
		{
			dataField: '_id',
			text: 'Item Id',
		},
		{
			dataField: 'name',
			text: 'Item Name',
			sort: true,
			filter: textFilter(),
		},
		{
			dataField: 'date',
			text: 'Added on',
			sort: true,
		},
	];

	//classes='table-dark'

	return (
		<BootstrapTable
			wrapperClasses="table-responsive"
			bootstrap4
			columns={columns}
			data={props.items}
			keyField="_id"
			filter={filterFactory()}
            classes='table-dark'
		/>
	);
};

export default CollectionTable;

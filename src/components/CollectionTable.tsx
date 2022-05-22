import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';

const ActionFormatter = () => {
	return (
		<div className="text-center">
			<Button className="btn-success" size="sm" style={{ marginRight: '4px' }}>
				View
			</Button>
			<Button className="btn-warning" size="sm" style={{ marginRight: '4px' }}>
				Edit
			</Button>
			<Button className="btn-danger" size="sm">
				Delete
			</Button>
		</div>
	);
};

const CollectionTable: React.FC<{ items: any[] }> = (props) => {
	const themeContext = useContext(ThemeContext);
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
		{
			dataField: 'actions',
			text: 'Actions',
			isDummyField: true,
			formatter: ActionFormatter,
		},
	];


	return (
		<BootstrapTable
			wrapperClasses="table-responsive"
			bootstrap4
			columns={columns}
			data={props.items}
			keyField="_id"
			filter={filterFactory()}
			classes={themeContext.theme === 'dark' ? 'table-dark' : ''}
		/>
	);
};

export default CollectionTable;

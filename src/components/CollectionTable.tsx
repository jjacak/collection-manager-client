import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ActionFormatter = (
	cell: any,
	row: any,
	index: number,
	formatExtraData: any
) => {
	
	return (
		<div className="text-center">
			<NavLink
				to={`/view-item/${row._id}`}
				className="btn"
				style={{
					color: 'var(--text-primary)',
					backgroundColor: 'var(--accent)',
					marginRight: '4px',
				}}
			>
				{formatExtraData.view}
			</NavLink>
			{formatExtraData.isAuthorized && (
				<Button className="btn-warning" style={{ marginRight: '4px' }}>
					{formatExtraData.edit}
				</Button>
			)}
			{formatExtraData.isAuthorized && <Button className="btn-danger" onClick={formatExtraData.onDelete.bind(null, row._id)}>{formatExtraData.delete}</Button>}
		</div>
	);
};

const CollectionTable: React.FC<{ items: any[]; isAuthorized: boolean; onDelete:(itemID:string)=>void }> = (
	props
) => {
	const { t } = useTranslation();
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
			formatExtraData: {isAuthorized:props.isAuthorized,onDelete:props.onDelete ,view:t("view"), edit:t("edit"), delete:t("delete")},
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

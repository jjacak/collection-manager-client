import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';

const AdminPanel = () => {
	const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);


	return (
		<section>
			<h1 className="text-center">{t('user_management')}</h1>
			<Table striped bordered hover variant={themeContext.theme==='dark'?'dark':''}>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
};

export default AdminPanel;

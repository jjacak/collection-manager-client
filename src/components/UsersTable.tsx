import { useContext, useState } from 'react';
import { ThemeContext } from '../store/theme-context';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { User } from '@auth0/auth0-react';
import classes from './UsersTable.module.css';

const UsersTable: React.FC<{
	users: User[];
	onDeleteUser: (id: string) => void;
	onBlockUser: (id: string, block: boolean) => void;
	onAssignRoles: (id: string, roles:string[]) => void;
}> = (props) => {
	const themeContext = useContext(ThemeContext);

	return (
		<Table
			striped
			bordered
			hover
			responsive
			variant={themeContext.theme === 'dark' ? 'dark' : ''}
		>
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Email</th>
					<th>Roles</th>
					<th>Last login</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{props.users.map((u) => {
					const role =
						u['app_metadata'] &&
						u['app_metadata'].roles &&
						u['app_metadata'].roles.includes('admin')
							? 'Admin'
							: 'User';
					const isBlocked = u.blocked;
					return (
						<tr key={u['user_id']}>
							<td>{u['user_id']}</td>
							<td>{u.nickname}</td>
							<td>{u.email}</td>
							<td>{role}</td>
							<td>{u['last_login'].slice(0, 10)}</td>
							<td>{isBlocked ? 'Blocked' : 'Active'}</td>
							<td>
								<ButtonGroup
									aria-label="User actions"
									className={classes.actions}
								>
									<Button
										className={classes['actions-button']}
										variant="btn-link"
										onClick={props.onDeleteUser.bind(null, u['user_id'])}
									>
										Delete
									</Button>
									<Button
										className={classes['actions-button']}
										variant="btn-link"
										onClick={props.onBlockUser.bind(null, u['user_id'], !isBlocked)}
									>
										{isBlocked ? 'Unblock' : 'Block'}
									</Button>
									<Button
										className={classes['actions-button']}
										variant="btn-link"
                                        onClick={props.onAssignRoles.bind(null, u['user_id'], ['rol_E0jr35p4mJfEDK8m'])}
									>
										Modify roles
									</Button>
								</ButtonGroup>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
export default UsersTable;

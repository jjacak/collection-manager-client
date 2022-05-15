import { useContext, useState } from 'react';
import { ThemeContext } from '../store/theme-context';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { User } from '@auth0/auth0-react';
import classes from './UsersTable.module.css';
import { useTranslation } from 'react-i18next';

const UsersTable: React.FC<{
	users: User[];
	onDeleteUser: (id: string) => void;
	onBlockUser: (id: string, block: boolean) => void;
	onUpdateRoles: (id: string, roles: string[], removeRole: boolean) => void;
	onUpdateMetadata: (id: string, roleName: string[] | null) => void;
}> = (props) => {
	const themeContext = useContext(ThemeContext);
	const { t } = useTranslation();

	const assignRole = (
		id: string,
		roles: string[],
		roleName: string[] | null,
		removeRole: boolean
	) => {
		props.onUpdateRoles(id, roles, removeRole);
		props.onUpdateMetadata(id, roleName);
	};

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
					<th>{t("name")}</th>
					<th>Email</th>
					<th>{t("roles")}</th>
					<th>{t("last_login")}</th>
					<th>Status</th>
					<th>{t("actions")}</th>
				</tr>
			</thead>
			<tbody>
				{props.users.map((u) => {
					const role =
						u['app_metadata'] &&
						u['app_metadata'].roles &&
						u['app_metadata'].roles.length > 0
							? u['app_metadata'].roles
							: 'user';
					const isBlocked = u.blocked;
					return (
						<tr key={u['user_id']}>
							<td>{u['user_id']}</td>
							<td>{u.nickname}</td>
							<td>{u.email}</td>
							<td>{role}</td>
							<td>{u['last_login'].slice(0, 10)}</td>
							<td>{isBlocked ? t("blocked") : t("active")}</td>
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
										{t("delete")}
									</Button>
									<Button
										className={classes['actions-button']}
										variant="btn-link"
										onClick={props.onBlockUser.bind(
											null,
											u['user_id'],
											!isBlocked
										)}
									>
										{isBlocked ? t("unblock") : t("block")}
									</Button>
									{!role.includes('admin') && (
										<Button
											className={classes['actions-button']}
											variant="btn-link"
											onClick={assignRole.bind(
												null,
												u['user_id'],
												['rol_E0jr35p4mJfEDK8m'],
												['admin'],
												false
											)}
										>
											{t("promote_user")}
										</Button>
									)}
									{role.includes('admin') && (
										<Button
											className={classes['actions-button']}
											variant="btn-link"
											onClick={assignRole.bind(
												null,
												u['user_id'],
												['rol_E0jr35p4mJfEDK8m'],
												[],
												true
											)}
										>
											{t("downgrade_user")}
										</Button>
									)}
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

import { Link } from 'react-router-dom';
import { HomeFillIcon } from '@primer/octicons-react';
import classes from './NotFound.module.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound:React.FC = () => {
	const {t} = useTranslation();

	return (
			<Container>
				<div className={'row'}>
					<div className="col-md-12">
						<div className={classes['error']}>
							
							<h1>{t('not_found')}</h1>
							<div className={classes['error-details']}>
							{t('not_found_message')}
							</div>
							<div className={classes['error-actions']}>
								<Link to="/" className="btn btn-dark btn-lg">
									<HomeFillIcon size="medium" /> {t('take_me_home')}{' '}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Container>
		
	);
};

export default NotFound;

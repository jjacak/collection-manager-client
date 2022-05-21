import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CollectionInterface } from '../ts/types';
import { Badge } from 'react-bootstrap';

const ViewCollection = () => {
	const { id } = useParams();
	const [collection, setCollection] = useState<CollectionInterface | null>(
		null
	);

	useEffect(() => {
		const getCollection = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER}/get-collection/${id}`
				);
				console.log(response);
				setCollection(response?.data[0]);
			} catch (error) {
				console.log(error);
			}
		};
		getCollection();
	}, []);
	return (
		<main>
			<section>
				<h1 className="text-center mb-4 bg-warning">
					Collection: {collection?.title}
				</h1>
				<div className="text-center mb-4">
					<NavLink
						className="btn"
						style={{
							backgroundColor: 'var(--accent)',
							color: 'var(--text-primary',
						}}
						to={`/add-item/${id}`}
					>
						Add Item
					</NavLink>
				</div>
                <img src={collection?.image} className = "img-fluid d-block rounded mx-auto mb-4"alt="Collection cover image"/>
				<p className="fs-4">
					<span className="fw-bold">Author: </span>
					{collection?.owner_name}
				</p>
				<p className="fs-4">
					<span className="fw-bold">Category: </span>
					{collection?.topic}
				</p>
				<p className="fs-4">
					<span className="fw-bold">Description: </span>
					{collection?.description}
				</p>

				<p>
					{collection?.tags?.map((t, i) => {
						return (
							<Badge
								bg="warning"
								style={{ marginRight: '3px', cursor: 'pointer' }}
								key={i}
							>
								{t}
							</Badge>
						);
					})}
				</p>

				{!collection?.items!.length && <p className="text-center">
					This collection doens't have any items yet.
				</p>}
			</section>
		</main>
	);
};

export default ViewCollection;

import useHttp from '../hooks/use-http';
import { CollectionInterface, CollectionItem } from '../ts/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';

export const useCreateCollection = () => {
	const { getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();
	const { error, isLoading, sendRequest } = useHttp();

	const getResponse = (response: AxiosResponse) => {
		navigate('/profile');
	};

	const postColection = async (data: FormData) => {
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});

		sendRequest(
			`${process.env.REACT_APP_SERVER}/create-collection`,
			{
				method: 'POST',
				body: data,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
			getResponse
		);
	};

	return { error, isLoading, postColection };
};

export const useAddItem = () => {
	const { getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();
	const { error, isLoading, sendRequest } = useHttp();

	const { id } = useParams();

	type CollectionItemDataType = {
		[key: string]:
			| string
			| undefined
			| Date
			| { value: string; label: string; type: string };
	};

	const getResponse = (response: AxiosResponse) => {
		navigate(`/view-collection/${id}`);
	};

	const postItem = async (data: CollectionItemDataType) => {
		const accessToken = await getAccessTokenSilently({
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
		});

		sendRequest(
			`${process.env.REACT_APP_SERVER}/add-item/${id}`,
			{
				method: 'POST',
				body: data,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
			getResponse
		);
	};
	return { error, isLoading, postItem };
};

export const getLargestCollections = async () => {
	
	const collections = await axios.get(
		`${process.env.REACT_APP_SERVER}/get-largest-collections`
	);
	return collections;
};

export const getLatestItems = async () => {

	const items = await axios.get(`${process.env.REACT_APP_SERVER}/get-newest`);
	return items;
};

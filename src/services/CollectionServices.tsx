import useHttp from '../hooks/use-http';
import { CollectionInterface, CollectionItem } from '../ts/types';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const useCreateCollection = () => {
    const { getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();
	const { error, isLoading, sendRequest } = useHttp();
    
	const getResponse = (response: any) => {
		navigate('/profile');
	};

   const postColection = async(data: FormData)=>{

    const accessToken = await getAccessTokenSilently({
		audience: process.env.REACT_APP_AUTH0_AUDIENCE,
	});

    sendRequest(`${process.env.REACT_APP_SERVER}/create-collection`, {
        method: 'POST',
        body:data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }, getResponse);
   }

    return {error,isLoading, postColection}
};

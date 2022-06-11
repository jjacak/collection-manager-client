import axios from 'axios';
import { useCallback, useState } from 'react';

const useHttp = () => {
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [didSubmit, setDidSubmit] = useState<boolean>(false);

	const sendRequest = useCallback(
		async (
			url: string,
			requestConfig?: { [key: string]: any },
			applyData?: (data: any) => any
		) => {
			setError(null);
			setIsLoading(true);
			setDidSubmit(false);
			try {
				const response = await axios({
					url: url,
					method: requestConfig?.method ? requestConfig.method : 'GET',
					data: requestConfig?.body ? requestConfig.body : null,
					headers: requestConfig?.headers ? requestConfig.headers : {},
				});

				if (applyData) {
					applyData(response);
				}
			} catch (error: any) {
				setError(error.message);
			}
			setIsLoading(false);
			setDidSubmit(true);
		},
		[]
	);
	return { error, isLoading, sendRequest, didSubmit};
};

export default useHttp;

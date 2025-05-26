import { useState, useCallback } from 'react';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendRequest = useCallback(
		async (
			url: string,
			method = 'GET',
			body: BodyInit | null = null,
			headers: HeadersInit = {}
		) => {
			setIsLoading(true);
			try {
				const res = await fetch(url, {
					method,
					body,
					headers,
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}

				return data;
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
                    console.error('HTTP Error: ', err.message);
				}
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	return { isLoading, error, sendRequest };
};

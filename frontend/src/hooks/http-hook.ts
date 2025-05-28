import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const activeHttpRequests = useRef<AbortController[]>([]);

	const sendRequest = useCallback(
		async (
			url: string,
			method = 'GET',
			body: BodyInit | null = null,
			headers: HeadersInit = {}
		) => {
			setIsLoading(true);
			const httpAbortControl = new AbortController();
			activeHttpRequests.current.push(httpAbortControl);

			try {
				const res = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortControl.signal,
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
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(ctrl) => ctrl !== httpAbortControl
				);
				setIsLoading(false);
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((ctrl) => ctrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};

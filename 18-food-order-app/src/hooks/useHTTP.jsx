import { useEffect, useState, useCallback } from "react";

async function  sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong!'
        );
    }
    return resData;
}

export default function useHTTP(url, config, defaultData) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(defaultData);

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            // console.log(resData)
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config ) {
            // console.log('ff called');
            sendRequest();
        }
    }, [sendRequest, config]);

    function resetData() {
        setData(defaultData);
    }

    return {
        isLoading,
        error,
        data,
        sendRequest,
        resetData,
    }
}
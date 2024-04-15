import { useEffect, useState } from "react";

export function useHTTP(fetchDataFn, defaultData){
    const [responseData, setResponseData] = useState(defaultData);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchDataFn();
            setResponseData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch user places.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchDataFn]);

    return {
        isFetching,
        responseData,
        setResponseData,
        error
    }

}
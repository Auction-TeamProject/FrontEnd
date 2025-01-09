import { useEffect, useState } from 'react';

type ErrorResponse = {
  status: string;
  code: string;
  message: string;
};

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'code' in error &&
    'message' in error
  );
};

/**
 * 서버와 통신에 공통적으로 사용되는 훅입니다.
 *
 * @param {string} url - 요청할 URL
 * @returns 서버로부터 받은 데이터, 로딩 상태, 에러 상태
 */
const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          throw result;
        }

        setData(result);
      } catch (error: unknown) {
        if (isErrorResponse(error)) {
          setError(error);
        } else {
          setError({
            status: 'error',
            code: '알수없음',
            message: '알수없는 에러가 발생했습니다',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
export default useFetch;

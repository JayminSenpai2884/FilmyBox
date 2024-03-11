import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useAccessibilityMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/accessibility-movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useAccessibilityMovie;

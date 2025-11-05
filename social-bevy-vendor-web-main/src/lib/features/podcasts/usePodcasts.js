import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPodcasts = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}podcasts?orderBy=desc&sortColumn=id`);
  return response.data.result1;
};

const usePodcasts = () => {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export default usePodcasts;

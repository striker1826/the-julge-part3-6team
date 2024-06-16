import { apiInstance } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useGetNoticeByStoreId = (shop_id: string, offset: number) => {
  const LIMIT = 3;

  return useQuery({
    queryKey: [`/shops/${shop_id}/notices`, offset, shop_id],
    queryFn: () => {
      return apiInstance.get(
        `/shops/${shop_id}/notices?offset=${offset}&limit=${LIMIT}`,
      );
    },
    enabled: !!shop_id,
  });
};

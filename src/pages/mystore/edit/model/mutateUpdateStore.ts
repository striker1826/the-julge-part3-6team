import { apiInstance } from '@/shared/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export const mutateUpdateStore = (shop_id: string, setIsOpen: any) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['/shops/shop_id'],
    mutationFn: (store: Omit<Store, 'id'>) => {
      return apiInstance.put(`/shops/${shop_id}`, store);
    },
    onSuccess: () => {
      setIsOpen('수정완료 모달');
    },
    onError: (error: AxiosError) => {
      const statusCode = error.response?.status;
    },
  });
};
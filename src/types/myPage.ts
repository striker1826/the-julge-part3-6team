interface UserDataType {
  address?: string;
  bio?: string;
  name?: string;
  phone?: string;
  id: string;
  email: string;
  shop: Store;
  type: 'employee' | 'employer';
}

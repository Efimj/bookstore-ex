export default interface IUser {
  user_id: number;
  user_type_id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

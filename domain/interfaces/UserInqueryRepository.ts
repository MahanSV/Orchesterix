import UserInquery from '#models/UserInquery.ts';


export interface UserInqueryRepositoryInterface {
  findById(id: string): Promise<UserInquery | null>;
}
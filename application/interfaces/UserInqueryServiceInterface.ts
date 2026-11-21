import { UserInqueryDTO } from '#application/dto/UserInqueryDTO.ts';


export interface UserInqueryServiceInterface {
  findById(id: string): Promise<UserInqueryDTO>;
  createInqueryFromWebService(id: string): Promise<boolean>;
}
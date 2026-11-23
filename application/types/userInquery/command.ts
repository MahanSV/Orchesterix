import { Guarantee, Loan } from '#models/UserInquery.ts';


export type createUserInqueryCommand = {
  point?: string;
  guarantees?: Guarantee[];
  loans: Loan[];
  totalTurnover: number;
  userId: string;
};
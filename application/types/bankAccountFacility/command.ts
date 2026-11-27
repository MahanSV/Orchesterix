
export type createBankAccountFacilityCommand = {
  value: string;
  bankAccountId: string;
  facilityFieldId: string;
};

export type createBankAccountFacilityListCommand = {
  userId: string;
  facilityTemplateId: string;
  data: createBankAccountFacilityCommand[]
};

export type adminFilterQueryCommand = {
  nationalId?: string;
  mobile?: string;
  page: number;
  limit: number;
  sortOrder: 'asc' | 'desc';
};
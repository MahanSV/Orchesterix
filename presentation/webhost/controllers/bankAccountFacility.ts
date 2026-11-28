import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BankAccountFacilityServiceInterface } from '#application/interfaces/BankAccountFacilityServiceInterface.ts';
import { BankAccountFacilityService } from '#application/services/BankAccountFacilityService.ts';
import { createBankAccountFacilityCommand } from '#application/types/bankAccountFacility/command.ts';

class BankAccountFacilityController {
  private bankAccountFacilitiesService: BankAccountFacilityServiceInterface;

  constructor(bankAccountFacilitiesService: BankAccountFacilityServiceInterface = new BankAccountFacilityService()) {
    this.bankAccountFacilitiesService = bankAccountFacilitiesService;
  };

  public getAllFilteredBankAccountFacilitiesForAdmin= async (req: Request, res: Response): Promise<any> => {
    try {
      const query = {
        nationalId: req.query.nationalId as string,
        mobile: req.query.mobile as string,
        page: Number(req.query.page) as number,
        limit: Number(req.query.limit) as number,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
      };

      const bankAccountFacilities = await this.bankAccountFacilitiesService.getAllFilteredBankAccountFacilitiesForAdmin(query);

      res.status(httpStatus.OK).send({
        message: 'لیست تسهیلات بانکی با موفقیت دریافت شد.',
        bankAccountFacilities
      });
    }
    catch (error) {
      throw error;
    }
  };

  public createBankAccountFacility = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        userId: req.body.userId,
        facilityTemplateId: req.body.facilityTemplateId as string,
        data: req.body.data as createBankAccountFacilityCommand[],
      };

      const bankAccountFacilities = await this.bankAccountFacilitiesService.createBankAccountFacility(command);

      res.status(httpStatus.OK).send({
        message: 'ایجاد تسهیلات بانکی با موفقیت دریافت شد.',
        bankAccountFacilities
      });
    }
    catch (error) {
      throw error;
    }
  };
}

export default new BankAccountFacilityController();
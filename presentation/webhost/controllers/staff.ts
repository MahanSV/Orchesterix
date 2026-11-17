import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import StaffService from '#application/services/StaffService.ts';

class StaffController {
  private staffService: StaffService;

  constructor(staffService = new StaffService()) {
    this.staffService = staffService;
  };

  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        nationalId: req.body.nationalId,
        password: req.body.password,
        role: req.body.role,
      };

      const staff = await this.staffService.login(command);

      res.status(httpStatus.OK).send({
        message: 'کاربر با موفقیت وارد شد.',
        staff
      });
    } catch (error) {
      throw error;
    }
  };

  public createStaff = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        name: req.body.name,
        lastName: req.body.lastName,
        nationalId: req.body.nationalId,
        role: req.body.role,
        status: req.body.status,
        password: req.body.password,
      };

      const staff = await this.staffService.createStaff(command);

      res.status(httpStatus.OK).send({
        message: 'کاربر با موفقیت ثبت شد.',
        staff
      });
    } catch (error) {
      throw error;
    }
  };
}

export default new StaffController();
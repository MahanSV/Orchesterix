import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import UserInqueryService from '#application/services/UserInqueryService.ts';


class UserInqueryController {
  private userInqueryService: UserInqueryService;

  constructor(userInqueryService = new UserInqueryService) {
    this.userInqueryService = userInqueryService;
  };

  public getUserInqueryById  = async (req: Request, res: Response): Promise<any> =>  {
    try {
    const id = req.params.id;

    const userInquery = await this.userInqueryService.findById(id);

      res.status(httpStatus.OK).send({
        message: 'استعلامات کاربر با موفقیت ثبت شد.',
        userInquery
      });
    } catch (error) {
      throw error;
    }
  };

  public createInqueryFromWebService = async (req: Request, res: Response): Promise<any> => {
    const userId = req.body.userId;

    await this.userInqueryService.createInqueryFromWebService(userId);

    res.status(httpStatus.OK).send({
      message: 'درخواست استعلامات کاربر با موفقیت ثبت شد.',
    });
  };
}

export default new UserInqueryController();
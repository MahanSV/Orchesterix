import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FacilitiesCategoryServiceInterface } from '#application/interfaces/FacilitiesCategoryServiceInterface.ts';
import { FacilitiesCategoryService } from '#application/services/FacilitiesCategoryService.ts';

class FacilitiesCategoryController {
  private facilitiesCategoryService: FacilitiesCategoryServiceInterface;

  constructor(facilitiesCategoryService: FacilitiesCategoryServiceInterface = new FacilitiesCategoryService()) {
    this.facilitiesCategoryService = facilitiesCategoryService;
  };

  public getAllFacilitiesCategory = async (req: Request, res: Response): Promise<any> => {
    try {
      const facilitiesCategoryList = await this.facilitiesCategoryService.getAllFacilitiesCategory();

      res.status(httpStatus.OK).send({
        message: 'لیست دسته های رفاهی با موفقیت دریافت شد.',
        facilitiesCategoryList
      });
    }
    catch (error) {
      throw error;
    }
  };

  public getFacilitiesCategoryById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      const facilitiesCategory = await this.facilitiesCategoryService.findById(id);

      res.status(httpStatus.OK).send({
        message: 'دسته رفاهی با موفقیت دریافت شد.',
        facilitiesCategory
      });
    }
    catch (error) {
      throw error;
    }
  };
}

export default new FacilitiesCategoryController();